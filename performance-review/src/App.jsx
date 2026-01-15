import React, { useState } from "react";
import {
  User,
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  Bell,
  FileText,
} from "lucide-react";
import EmployeeInfo from "./components/EmployeeInfo";
import GoalsSection from "./components/GoalsSection";
import Competencies from "./components/Competencies";
import GrowthAreas from "./components/GrowthAreas";
import SelfEvaluation from "./components/SelfEvaluation";
import Rating from "./components/Rating";
import "./styles/layout.css";

export default function App() {
  const [selectedRole, setSelectedRole] = useState("ic");

  const handleSubmit = () => {
    console.log("Performance review submitted");
    alert("Performance Review Submitted Successfully!");
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-icon">
              <svg
                className="header-star-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="white"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <h1 className="header-title">Performance Review</h1>
              <p className="header-subtitle">Evaluate performance</p>
            </div>
          </div>
          <button className="bell-icon-button">
            <Bell className="bell-icon" />
          </button>
        </div>

        <div className="nav-tabs-wrapper">
          <div className="nav-tabs-container">
            <button className="nav-tab">
              <FileText className="tab-icon" />
              <span>Submissions</span>
            </button>
            <button className="nav-tab">
              <Clock className="tab-icon" />
              <span>Timesheet</span>
            </button>
            <button className="nav-tab">
              <Calendar className="tab-icon" />
              <span>Tasks</span>
            </button>
            <button className="nav-tab">
              <MessageSquare className="tab-icon" />
              <span>Expense</span>
            </button>
            <button className="nav-tab nav-tab-active">
              <svg
                className="tab-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>Review</span>
            </button>
            <button className="nav-tab">
              <TrendingUp className="tab-icon" />
              <span>Builder</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Everything in one centered container */}
      <main className="main-content">
        <div className="content-container">
          {/* Role Selection Container */}
          <div className="role-selection-container">
            <div className="role-tabs-section">
              <button
                className={`role-tab ${
                  selectedRole === "ic" ? "role-tab-active" : ""
                }`}
                onClick={() => setSelectedRole("ic")}
              >
                <User className="role-icon" />
                <span>IC</span>
              </button>
              <button
                className={`role-tab ${
                  selectedRole === "senior-ic" ? "role-tab-active" : ""
                }`}
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
                className={`role-tab ${
                  selectedRole === "manager" ? "role-tab-active" : ""
                }`}
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

          {/* All Sections */}
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

          {/* Submit Button - NOT FIXED */}
          <button className="submit-button" onClick={handleSubmit}>
            Submit Performance Review
          </button>
        </div>
        <p className="submit-message">
          Reviews are tailored to your role with relevant competencies
        </p>
      </main>
    </div>
  );
}
