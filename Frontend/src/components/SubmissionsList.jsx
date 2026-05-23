import React, { useState } from "react";
import SubmissionCard from "./SubmissionCard";
import "../styles/SubmissionsList.css";

const SubmissionsList = ({
  submissions = [],
  isManager,
  onViewDetails,
  onReview,
}) => {
  const [activeFilter, setActiveFilter] = useState("pending");

  const filteredSubmissions = submissions.filter((submission) => {
    const status = (submission?.status || "").toString().trim().toLowerCase();
    return status === activeFilter;
  });

  const pendingCount = submissions.filter((s) => {
    const status = (s?.status || "").toString().trim().toLowerCase();
    return status === "pending";
  }).length;

  // 🛠️ CHANGED HERE: Only count reviewed submissions that the employee HAS NOT viewed yet
  const unreadReviewedCount = submissions.filter((s) => {
    const status = (s?.status || "").toString().trim().toLowerCase();
    return status === "reviewed" && !s.viewedByEmployee;
  }).length;

  return (
    <div className="submissions-list">
      <div className="submissions-filter">
        <button
          className={`filter-button ${activeFilter === "pending" ? "active" : ""}`}
          onClick={() => setActiveFilter("pending")}
        >
          Pending
          {pendingCount > 0 && (
            <span className="filter-count">{pendingCount}</span>
          )}
        </button>
        <button
          className={`filter-button ${activeFilter === "reviewed" ? "active" : ""}`}
          onClick={() => setActiveFilter("reviewed")}
        >
          Reviewed
          {/* 🛠️ CHANGED HERE: Uses the dynamic unreadReviewedCount variable now */}
          {unreadReviewedCount > 0 && (
            <span className="filter-count">{unreadReviewedCount}</span>
          )}
        </button>
      </div>

      <div className="submissions-content">
        {filteredSubmissions.length === 0 ? (
          <div className="empty-state">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>No {activeFilter} submissions</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <SubmissionCard
              key={submission._id || submission.id || submission.user?.name}
              submission={submission}
              isManager={isManager}
              onViewDetails={onViewDetails}
              onReview={onReview}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SubmissionsList;
