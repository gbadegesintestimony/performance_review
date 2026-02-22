import React from "react";
import "../styles/SubmissionCard.css";

const SubmissionCard = ({ submission }) => {
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
            <h3 className="submission-title">{submission.title}</h3>
            <p className="submission-meta">
              By {submission.submittedBy} • {submission.timeAgo}
            </p>
          </div>
        </div>
        <div className="submission-status">
          <span
            className={`status-badge status-${submission.status.toLowerCase()}`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="currentColor" />
            </svg>
            {submission.status}
          </span>
        </div>
      </div>
      <div className="submission-actions">
        <button className="action-button primary">View Details</button>
        <button className="action-button secondary">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8V12L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.05 11H5C5.53043 11 6.03914 11.2107 6.41421 11.5858C6.78929 11.9609 7 12.4696 7 13V21M21 11H19C18.4696 11 17.9609 11.2107 17.5858 11.5858C17.2107 11.9609 17 12.4696 17 13V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z"
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
