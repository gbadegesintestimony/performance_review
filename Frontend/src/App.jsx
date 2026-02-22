import React, { useState } from "react";
import {
  User,
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  FileText,
  Star,
} from "lucide-react";
import EmployeeInfo from "./components/EmployeeInfo";
import GoalsSection from "./components/GoalsSection";
import Competencies from "./components/Competencies";
import GrowthAreas from "./components/GrowthAreas";
import SelfEvaluation from "./components/SelfEvaluation";
import Rating from "./components/Rating";
import SubmissionsList from "./components/SubmissionsList";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import NotificationPanel from "./components/NotificationPanel";
import "./App.css";
import "./styles/layout.css";

const TAB_CONFIG = {
  submissions: {
    label: "Submissions",
    heading: "Submissions",
    subtitle: "Review and approve",
  },
  timesheet: {
    label: "Timesheet",
    heading: "Timesheet",
    subtitle: "Track your hours",
  },
  tasks: { label: "Tasks", heading: "Tasks", subtitle: "Manage your work" },
  expense: {
    label: "Expense",
    heading: "Expense",
    subtitle: "Track your spending",
  },
  review: {
    label: "Review",
    heading: "Performance Review",
    subtitle: "Evaluate performance",
  },
  builder: {
    label: "Builder",
    heading: "Builder",
    subtitle: "Build your profile",
  },
};

export default function App() {
  const [selectedRole, setSelectedRole] = useState("ic");
  const [activeTab, setActiveTab] = useState("submissions");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentTab = TAB_CONFIG[activeTab];

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleSubmit = () => {
    alert("Performance Review Submitted Successfully!");
  };

  return (
    <div className="page-wrapper">
      <Header
        activeTab={activeTab}
        title={currentTab.heading}
        subtitle={currentTab.subtitle}
        notificationCount={unreadCount}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        {activeTab === "submissions" && (
          <div className="content-container">
            <SubmissionsList submissions={submissions} />
          </div>
        )}

        {activeTab === "review" && (
          <div className="content-container">
            <div className="role-selection-container">
              <div className="role-tabs-section">
                <button
                  className={`role-tab ${selectedRole === "ic" ? "role-tab-active" : ""}`}
                  onClick={() => setSelectedRole("ic")}
                >
                  <User className="role-icon" />
                  <span>IC</span>
                </button>
                <button
                  className={`role-tab ${selectedRole === "senior-ic" ? "role-tab-active" : ""}`}
                  onClick={() => setSelectedRole("senior-ic")}
                >
                  <svg
                    className="role-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Senior IC</span>
                </button>
                <button
                  className={`role-tab ${selectedRole === "manager" ? "role-tab-active" : ""}`}
                  onClick={() => setSelectedRole("manager")}
                >
                  <svg
                    className="role-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Manager</span>
                </button>
              </div>
            </div>

            <div className="section-container">
              <EmployeeInfo />
            </div>
            <div className="section-container">
              <GoalsSection />
            </div>
            <div className="section-container">
              <Competencies selectedRole={selectedRole} />
            </div>
            <div className="section-container">
              <GrowthAreas />
            </div>
            <div className="section-container">
              <SelfEvaluation />
            </div>
            <div className="section-container">
              <Rating />
            </div>

            <button className="submit-button" onClick={handleSubmit}>
              Submit Performance Review
            </button>
            <p className="submit-message">
              Reviews are tailored to your role with relevant competencies
            </p>
          </div>
        )}

        {activeTab !== "submissions" && activeTab !== "review" && (
          <div className="tab-placeholder">
            <h2>{currentTab.heading}</h2>
            <p>This section is under development</p>
          </div>
        )}
      </main>

      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAllRead={handleMarkAllRead}
        />
      )}
    </div>
  );
}
