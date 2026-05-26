import React, { useState, useEffect } from "react";
import { User, UserCheck, Users } from "lucide-react";

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
import Expense from "./components/Expense";

import "./App.css";
import "./styles/layout.css";

const PlaceholderView = ({ title }) => (
  <div
    className="empty-state"
    style={{
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#0f172a" }}>
      {title}
    </h2>
    <p style={{ fontSize: "1.1rem", color: "#64748b", marginTop: "10px" }}>
      This section is under development
    </p>
  </div>
);

const TAB_CONFIG = {
  submissions: {
    label: "Submissions",
    heading: "Submissions",
    subtitle: "Review and approve",
  },
  review: {
    label: "Review",
    heading: "Performance Review",
    subtitle: "Evaluate performance",
  },
  timesheet: {
    label: "Timesheet",
    heading: "Timesheet",
    subtitle: "Track your hours",
  },
  builder: {
    label: "Builder",
    heading: "Builder",
    subtitle: "Build your profile",
  },
  tasks: { label: "Tasks", heading: "Tasks", subtitle: "Manage your work" },
  expense: {
    label: "Expense",
    heading: "Expense",
    subtitle: "Track your spending",
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

  const [reviewData, setReviewData] = useState({
    reviewPeriod: "",
    department: "",
    employeeInfo: {
      name: "",
      role: "",
      department: "",
      reviewPeriod: "",
    },
    goals: [],
    competencies: {},
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
    overallRating: "",
  });

  const isManager = currentUser?.role === "Manager";
  const currentTab = TAB_CONFIG[activeTab];

  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const unreadReviewedCount = submissions.filter(
    (s) => s.status === "reviewed" && !s.viewedByEmployee,
  ).length;

  // Header notification indicator updates instantly
  const notificationCount = isManager ? pendingCount : unreadReviewedCount;

  // Restructure items array computation to group items cleanly for employees
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
    } else if (!isManager && unreadReviewedCount > 0) {
      notifs.push({
        id: "aggregated-reviewed-count",
        title: "Review Completed",
        message: `You have ${unreadReviewedCount} reviewed review${unreadReviewedCount > 1 ? "s" : ""}.`,
        timeAgo: "recently",
        read: false,
      });
    }
    return notifs;
  }, [submissions, isManager, pendingCount, unreadReviewedCount]);

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

  useEffect(() => {
    if (currentUser?._id && isAuthenticated) {
      setActiveTab("submissions");
      setReviewData((prev) => ({
        ...prev,
        department: currentUser.department,
        employeeInfo: {
          name:
            currentUser.name ||
            `${currentUser.firstName} ${currentUser.lastName}`,
          role: currentUser.role,
          department: currentUser.department,
          reviewPeriod: "",
        },
      }));
    }
  }, [currentUser?._id]);

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
    setSubmissions((prev) =>
      prev.map((s) => ({ ...s, viewedByEmployee: true })),
    );
  };

  const handleSubmit = async () => {
    const structuralAreas = reviewData.growthAreas?.areas || [];
    try {
      console.log("Submitting review data:", reviewData);

      const transformedData = {
        reviewPeriod: reviewData.reviewPeriod,
        department: reviewData.department,
        employeeInfo: {
          name: reviewData.employeeInfo.name,
          role: reviewData.employeeInfo.role,
          department: reviewData.employeeInfo.department,
          reviewPeriod: reviewData.reviewPeriod,
        },
        goals: reviewData.goals
          .filter((g) => {
            const desc = typeof g === "string" ? g : g.description;
            return desc && desc.trim() !== "";
          })
          .map((g) => {
            if (typeof g === "string") {
              return { description: g, progress: 0, comments: "" };
            }
            return {
              description: g.description,
              progress: Number(g.progress) || 0,
              comments: g.comments || "",
            };
          }),

        competencies: reviewData.competencies,
        growthAreas: {
          strengths: structuralAreas
            .map((item) => item.strengths || "")
            .filter((str) => str.trim() !== ""),
          areasForImprovement: structuralAreas
            .map((item) => item.improvements || "")
            .filter((str) => str.trim() !== ""),
          developmentGoals: structuralAreas
            .map((item) => item.developmentGoals || "")
            .filter((str) => str.trim() !== ""),
        },
        selfEvaluation: reviewData.selfEvaluation,
        overallRating: reviewData.overallRating,
      };

      console.log(
        "Transformed data being sent:",
        JSON.stringify(transformedData, null, 2),
      );

      const response = await createSubmission(transformedData);

      if (response.success) {
        alert("Performance Review Submitted Successfully!");

        // 🌟 FIX: Reset reviewData back to a completely clean slate on success
        setReviewData({
          reviewPeriod: "",
          department: currentUser?.department || "",
          employeeInfo: {
            name:
              currentUser?.name ||
              `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim(),
            role: currentUser?.role || "",
            department: currentUser?.department || "",
            reviewPeriod: "",
          },
          goals: [],
          competencies: {},
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
          overallRating: "", // Drops the star ranking components highlight back to blank
        });

        const updatedSubmissions = await getMySubmissions();
        setSubmissions(
          Array.isArray(updatedSubmissions.data) ? updatedSubmissions.data : [],
        );
        setActiveTab("submissions");
      } else {
        alert("Failed to submit: " + response.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit review: " + error.message);
    }
  };

  const handleLogin = (response) => {
    const userData = response.data || response;

    const formattedUser = {
      ...userData,
      name: userData.name || `${userData.firstName} ${userData.lastName}`,
      department: userData.department,
    };

    setCurrentUser(formattedUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(formattedUser));
    console.log("Logged in user:", formattedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  const handleViewDetails = (submission) => {
    console.log("Viewing submission:", submission);
    setSelectedSubmission(submission);
    setShowDetailModal(true);

    if (
      !isManager &&
      submission.status === "reviewed" &&
      !submission.viewedByEmployee
    ) {
      // 1. Instantly update local array to trigger immediate counter markdown decrease
      setSubmissions((prev) =>
        prev.map((s) =>
          s._id === submission._id ? { ...s, viewedByEmployee: true } : s,
        ),
      );

      // 2. Persist view interaction state back to internal DB service layer
      fetch(
        `http://localhost:5000/api/submissions/${submission._id}/mark-viewed`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      ).catch((err) => console.error("Failed to mark as viewed:", err));
    }
  };

  const handleReview = (submission) => {
    console.log("Opening review modal:", submission);
    setSelectedSubmission(submission);
    setShowDetailModal(true);
  };

  const handleApproveReview = async (idOrObject, feedbackData) => {
    try {
      const id =
        typeof idOrObject === "object"
          ? idOrObject._id || idOrObject.id
          : idOrObject;

      console.log("Approving review:", { id, feedbackData });

      if (!id || id === "undefined") {
        console.error("App.jsx Error: Received invalid ID", {
          idOrObject,
          feedbackData,
        });
        alert("Error: No submission ID found. Please refresh and try again.");
        return;
      }

      const result = await reviewSubmission(id, feedbackData);

      if (result.success) {
        alert("Review submitted successfully!");

        const response = isManager
          ? await getPendingSubmissions()
          : await getMySubmissions();
        const freshData = response.success ? response.data : response;
        setSubmissions(Array.isArray(freshData) ? freshData : []);

        setShowDetailModal(false);
        setSelectedSubmission(null);
      } else {
        alert("Failed: " + result.message);
      }
    } catch (error) {
      console.error("Review Process Error:", error);
      alert("System Error: " + error.message);
    }
  };

  if (authLoading) return <div className="loading-screen">Loading...</div>;
  if (!isAuthenticated) return <AuthView onLogin={handleLogin} />;

  return (
    <div className="page-wrapper">
      <Header
        user={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        title={currentTab?.heading || "Dashboard"}
        subtitle={currentTab?.subtitle || ""}
        notificationCount={notificationCount}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        <div className="content-container">
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
                  isManager={isManager}
                  onViewDetails={handleViewDetails}
                  onReview={isManager ? handleReview : null}
                />
              )}
            </>
          )}

          {activeTab === "review" && (
            <div className="review-form-wrapper">
              <div className="role-selection-container">
                <div className="role-tabs-section">
                  <button
                    className={`role-tab ${selectedRole === "ic" ? "role-tab-active" : ""}`}
                    onClick={() => setSelectedRole("ic")}
                  >
                    <User size={18} /> <span>IC</span>
                  </button>
                  <button
                    className={`role-tab ${selectedRole === "senior-ic" ? "role-tab-active" : ""}`}
                    onClick={() => setSelectedRole("senior-ic")}
                  >
                    <UserCheck size={18} /> <span>Senior IC</span>
                  </button>
                  <button
                    className={`role-tab ${selectedRole === "manager" ? "role-tab-active" : ""}`}
                    onClick={() => setSelectedRole("manager")}
                  >
                    <Users size={18} /> <span>Manager</span>
                  </button>
                </div>
              </div>

              <div className="section-container">
                <EmployeeInfo
                  user={currentUser}
                  selectedPeriod={reviewData.reviewPeriod}
                  onPeriodChange={(nextPeriod) => {
                    setReviewData((prev) => ({
                      ...prev,
                      reviewPeriod: nextPeriod,
                      employeeInfo: {
                        ...prev.employeeInfo,
                        reviewPeriod: nextPeriod,
                      },
                    }));
                  }}
                />
              </div>

              <div className="section-container">
                <GoalsSection
                  goals={reviewData.goals}
                  onGoalsChange={(goals) =>
                    setReviewData((p) => ({ ...p, goals }))
                  }
                />
              </div>

              <div className="section-container">
                <Competencies
                  selectedRole={selectedRole}
                  competencies={reviewData.competencies}
                  onCompetenciesChange={(competencies) =>
                    setReviewData((p) => ({ ...p, competencies }))
                  }
                />
              </div>

              <div className="section-container">
                <GrowthAreas
                  growthAreas={reviewData.growthAreas}
                  onGrowthAreasChange={(growthAreas) =>
                    setReviewData((p) => ({ ...p, growthAreas }))
                  }
                />
              </div>

              <div className="section-container">
                <SelfEvaluation
                  selfEvaluation={reviewData.selfEvaluation}
                  onSelfEvaluationChange={(selfEvaluation) =>
                    setReviewData((p) => ({ ...p, selfEvaluation }))
                  }
                />
              </div>

              <div className="section-container">
                <Rating
                  rating={reviewData.overallRating}
                  onRatingChange={(overallRating) =>
                    setReviewData((p) => ({ ...p, overallRating }))
                  }
                />
              </div>

              <button className="submit-button" onClick={handleSubmit}>
                Submit Performance Review
              </button>
            </div>
          )}

          {activeTab === "expense" && <Expense />}

          {["timesheet", "builder", "tasks"].includes(activeTab) && (
            <PlaceholderView title={TAB_CONFIG[activeTab].label} />
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
          currentUser={currentUser}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedSubmission(null);
          }}
          onApprove={handleApproveReview}
        />
      )}
    </div>
  );
}
