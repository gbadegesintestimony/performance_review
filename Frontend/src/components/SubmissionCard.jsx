// Frontend/src/components/SubmissionCard.jsx
import React from "react";
import "../styles/SubmissionCard.css";

const SubmissionCard = ({ submission, isManager, onViewDetails, onReview }) => {
  // SAFETY HELPER: Safely extracts a printable string name from nested object fields
  const getEmployeeDisplayText = () => {
    if (!submission) return "Unknown";

    // 1. Check submittedBy field
    if (submission.submittedBy) {
      if (typeof submission.submittedBy === "object") {
        return submission.submittedBy.name || submission.submittedBy.email;
      }
      return submission.submittedBy;
    }

    // 2. Check employee field
    if (submission.employee) {
      if (typeof submission.employee === "object") {
        return submission.employee.name || submission.employee.email;
      }
      return submission.employee;
    }

    // 3. Check employeeInfo field
    if (submission.employeeInfo) {
      if (typeof submission.employeeInfo === "object") {
        return submission.employeeInfo.name || submission.employeeInfo.email;
      }
      return submission.employeeInfo;
    }

    // 4. Check user field fallback (standard Mongoose populations usually sit here)
    if (submission.user) {
      if (typeof submission.user === "object") {
        return submission.user.name || submission.user.email;
      }
      return submission.user;
    }

    return "Unknown Employee";
  };

  // 👇 FIXED TIMESTAMP HELPER: Uses reviewedAt for reviewed cards, falls back to createdAt
  const getTimeAgoText = () => {
    if (!submission) return "recently";

    // If status is reviewed, target managerFeedback.reviewedAt. Fallback to createdAt if missing or pending.
    const referenceTimestamp =
      submission.status === "reviewed" && submission.managerFeedback?.reviewedAt
        ? submission.managerFeedback.reviewedAt
        : submission.createdAt;

    if (!referenceTimestamp) return "recently";

    const createdDate = new Date(referenceTimestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    if (diffInSeconds < 60) return "just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return createdDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="submission-card">
      <div className="submission-header">
        <div className="submission-info">
          <div className="submission-icon">
            <svg
              width="20"
              height="20"
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
          </div>
          <div className="submission-details">
            <h3 className="submission-title">{`Performance Review`}</h3>

            <p className="submission-meta">
              By {getEmployeeDisplayText()} • {getTimeAgoText()}
            </p>
          </div>
        </div>
        <div className="submission-status">
          <span
            className={`status-badge status-${(submission.status || "pending").toLowerCase()}`}
          >
            {submission.status || "pending"}
          </span>
        </div>
      </div>

      <div className="submission-actions">
        {/* IC/Senior IC: Show View Details */}
        {(!isManager || (isManager && submission.status !== "pending")) && (
          <button
            className="action-button action-view"
            onClick={() => onViewDetails && onViewDetails(submission)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Details
          </button>
        )}

        {/* Manager: Show Review button for pending submissions */}
        {isManager && onReview && submission.status === "pending" && (
          <button
            className="action-button action-review-main"
            onClick={() => onReview(submission)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Review
          </button>
        )}

        <button className="action-button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="12 6 12 12 16 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          History
        </button>
      </div>
    </div>
  );
};

export default SubmissionCard;
