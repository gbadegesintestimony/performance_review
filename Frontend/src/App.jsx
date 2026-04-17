// Frontend/src/App.jsx - COLLECTS ALL FORM DATA
import React, { useState, useEffect } from "react";
import {
  getPendingSubmissions,
  getMySubmissions,
  createSubmission,
  reviewSubmission,
} from "./api/submissionApi";

import AuthView from "./components/AuthView";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import NotificationPanel from "./components/NotificationPanel";
import SubmissionsList from "./components/SubmissionsList";
import SubmissionDetailModal from "./components/SubmissionDetailModal";

// Import review components
import EmployeeInfo from "./components/EmployeeInfo";
import GoalsSection from "./components/GoalsSection";
import Competencies from "./components/Competencies";
import GrowthAreas from "./components/GrowthAreas";
import SelfEvaluation from "./components/SelfEvaluation";
import Rating from "./components/Rating";

import "./App.css";
import "./styles/layout.css";

const TAB_CONFIG = {
  submissions: {
    label: "Submissions",
    heading: "Submissions",
    subtitle: "Review and approve",
  },
  mySubmissions: {
    label: "My History",
    heading: "My Submissions",
    subtitle: "View your past reviews",
  },
  review: {
    label: "Review",
    heading: "Performance Review",
    subtitle: "Evaluate performance",
  },
};

export default function App() {
  const [selectedRole, setSelectedRole] = useState("ic");
  const [activeTab, setActiveTab] = useState("submissions");
  const [showNotifications, setShowNotifications] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // ✅ COMPLETE Review form state - ALL FIELDS
  const [reviewData, setReviewData] = useState({
    reviewPeriod: "Q1 2024",
    department: "",
    employeeInfo: {
      name: "",
      role: "",
      department: "",
      reviewPeriod: "Q1 2024",
    },
    goals: [],
    competencies: {
      technicalSkills: 3,
      problemSolving: 3,
      communication: 3,
      teamwork: 3,
      leadership: 3,
      timeManagement: 3,
    },
    growthAreas: {
      strengths: [],
      areasForImprovement: [],
      developmentGoals: [],
    },
    selfEvaluation: {
      accomplishments: "",
      challenges: "",
      learnings: "",
      futureGoals: "",
    },
    overallRating: 3,
  });

  const isManager = currentUser?.role === "Manager";
  const currentTab = TAB_CONFIG[activeTab];
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  const notifications = React.useMemo(() => {
    const notifs = [];
    if (isManager && pendingCount > 0) {
      notifs.push({
        id: "pending-reviews",
        title: "Pending Reviews",
        message: `You have ${pendingCount} pending performance review${pendingCount > 1 ? "s" : ""} to review.`,
        timeAgo: "now",
        read: false,
      });
    }
    return notifs;
  }, [submissions, isManager, pendingCount]);

  // Initial auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth sync error:", err);
        handleLogout();
      }
    }
    setAuthLoading(false);
  }, []);

  // Set default tab and initialize form with user data
  useEffect(() => {
    if (currentUser?._id && isAuthenticated) {
      setActiveTab("submissions");
      setReviewData((prev) => ({
        ...prev,
        department: currentUser.department || "Engineering",
        employeeInfo: {
          name:
            currentUser.name ||
            `${currentUser.firstName} ${currentUser.lastName}`,
          role: currentUser.role,
          department: currentUser.department || "Engineering",
          reviewPeriod: "Q1 2024",
        },
      }));
    }
  }, [currentUser?._id]);

  // Fetch submissions
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;
    if (activeTab !== "submissions") return;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (isManager) {
          const response = await getPendingSubmissions();
          data = response.success ? response.data : response;
        } else {
          const response = await getMySubmissions();
          data = response.success ? response.data : response;
        }

        setSubmissions(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        if (err.message.includes("401")) handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [activeTab, isAuthenticated]);

  const handleMarkAllRead = () => {
    // In real app, this would update backend
  };

  // ✅ UPDATED: Submit with ALL form data
  const handleSubmit = async () => {
    try {
      console.log("Submitting complete review:", reviewData);

      const response = await createSubmission(reviewData);

      if (response.success) {
        alert("Performance Review Submitted Successfully!");
        setActiveTab("submissions");
        // Reset form
        setReviewData({
          reviewPeriod: "Q1 2024",
          department: currentUser?.department || "Engineering",
          employeeInfo: {
            name:
              currentUser.name ||
              `${currentUser.firstName} ${currentUser.lastName}`,
            role: currentUser.role,
            department: currentUser.department || "Engineering",
            reviewPeriod: "Q1 2024",
          },
          goals: [],
          competencies: {
            technicalSkills: 3,
            problemSolving: 3,
            communication: 3,
            teamwork: 3,
            leadership: 3,
            timeManagement: 3,
          },
          growthAreas: {
            strengths: [],
            areasForImprovement: [],
            developmentGoals: [],
          },
          selfEvaluation: {
            accomplishments: "",
            challenges: "",
            learnings: "",
            futureGoals: "",
          },
          overallRating: 3,
        });
      } else {
        alert("Failed to submit: " + response.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit review: " + error.message);
    }
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  // ✅ NEW: Handle View Details
  const handleViewDetails = (submission) => {
    console.log("Viewing submission:", submission);
    setSelectedSubmission(submission);
    setShowDetailModal(true);
  };

  // ✅ NEW: Handle Review (for managers)
  const handleReview = (submission) => {
    console.log("Reviewing submission:", submission);
    setSelectedSubmission(submission);
    setShowDetailModal(true);
  };

  if (authLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <div className="page-wrapper">
      <Header
        user={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        title={currentTab?.heading || "Dashboard"}
        subtitle={currentTab?.subtitle || ""}
        notificationCount={pendingCount}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        <div className="content-container">
          {/* Submissions List View */}
          {activeTab === "submissions" && (
            <>
              {loading ? (
                <div className="loader">Loading submissions...</div>
              ) : error ? (
                <div className="error-msg">Error: {error}</div>
              ) : submissions.length === 0 ? (
                <div className="empty-state">
                  <h3>No submissions found</h3>
                  <p>Check back later or start a new review.</p>
                </div>
              ) : (
                <SubmissionsList
                  submissions={submissions}
                  onViewDetails={handleViewDetails}
                  onReview={isManager ? handleReview : null}
                />
              )}
            </>
          )}

          {/* Performance Review Form View */}
          {activeTab === "review" && (
            <div className="review-form-wrapper">
              <div className="role-selection-container">
                <div className="role-tabs-section">
                  <button
                    className={`role-tab ${selectedRole === "ic" ? "role-tab-active" : ""}`}
                    onClick={() => setSelectedRole("ic")}
                  >
                    IC
                  </button>
                  <button
                    className={`role-tab ${selectedRole === "senior-ic" ? "role-tab-active" : ""}`}
                    onClick={() => setSelectedRole("senior-ic")}
                  >
                    Senior IC
                  </button>
                </div>
              </div>

              <div className="section-container">
                <EmployeeInfo user={currentUser} />
              </div>

              <div className="section-container">
                <GoalsSection
                  goals={reviewData.goals}
                  onGoalsChange={(goals) =>
                    setReviewData((prev) => ({ ...prev, goals }))
                  }
                />
              </div>

              <div className="section-container">
                <Competencies
                  selectedRole={selectedRole}
                  competencies={reviewData.competencies}
                  onCompetenciesChange={(competencies) =>
                    setReviewData((prev) => ({ ...prev, competencies }))
                  }
                />
              </div>

              <div className="section-container">
                <GrowthAreas
                  growthAreas={reviewData.growthAreas}
                  onGrowthAreasChange={(growthAreas) =>
                    setReviewData((prev) => ({ ...prev, growthAreas }))
                  }
                />
              </div>

              <div className="section-container">
                <SelfEvaluation
                  selfEvaluation={reviewData.selfEvaluation}
                  onSelfEvaluationChange={(selfEvaluation) =>
                    setReviewData((prev) => ({ ...prev, selfEvaluation }))
                  }
                />
              </div>

              <div className="section-container">
                <Rating
                  rating={reviewData.overallRating}
                  onRatingChange={(overallRating) =>
                    setReviewData((prev) => ({ ...prev, overallRating }))
                  }
                />
              </div>

              <button className="submit-button" onClick={handleSubmit}>
                Submit Performance Review
              </button>
              <p className="submit-message">
                Reviews are tailored to your role with relevant competencies
              </p>
            </div>
          )}
        </div>
      </main>

      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAllRead={handleMarkAllRead}
        />
      )}

      {showDetailModal && selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          isManager={isManager}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedSubmission(null);
          }}
          onApprove={async () => {
            // Approve submission logic
            setShowDetailModal(false);
            // Refresh submissions
          }}
          onReject={async () => {
            // Reject submission logic
            setShowDetailModal(false);
          }}
        />
      )}
    </div>
  );
}
