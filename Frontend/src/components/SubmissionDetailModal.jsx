// Frontend/src/components/SubmissionDetailModal.jsx
import React, { useState } from "react";
import "../styles/SubmissionDetailModal.css";

// Helper function to calculate relative time from database timestamp
const getTimeAgoText = (createdAt) => {
  if (!createdAt) return "recently";

  const createdDate = new Date(createdAt);
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

const SubmissionDetailModal = ({
  submission,
  isManager,
  currentUser,
  onClose,
  onApprove,
}) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = async () => {
    try {
      // 1. Correctly extract the ID from the submission prop
      const submissionId = submission?._id || submission?.id;

      if (!submissionId) {
        alert("Error: No submission ID found on this record.");
        return;
      }

      if (!feedback.trim()) {
        alert("Please provide feedback before approving");
        return;
      }

      if (rating === 0) {
        alert("Please provide a rating");
        return;
      }

      // 2. Prepare the data object
      const reviewData = {
        rating: rating,
        feedback: feedback,
        reviewedBy: currentUser?._id || currentUser?.id,
        reviewerName: currentUser?.name || "Manager",
      };

      console.log(
        "Submitting to App.jsx -> ID:",
        submissionId,
        "Data:",
        reviewData,
      );

      // 3. THE CRITICAL FIX:
      // We must pass the ID as the 1st argument so App.jsx's 'idOrObject' captures it.
      if (onApprove) {
        await onApprove(submissionId, reviewData);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert(`Error submitting review: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{`Performance Review`}</h2>
            <p className="modal-subtitle">
              Submitted by{" "}
              {submission.employeeInfo?.name ||
                submission.employee?.name ||
                submission.submittedBy?.name ||
                "Unknown"}{" "}
              • {getTimeAgoText(submission.createdAt)}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Employee Info */}
          <section className="detail-section">
            <h3>Employee Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>
                  {submission.employeeInfo?.name ||
                    submission.employee?.name ||
                    "N/A"}
                </span>
              </div>
              <div className="info-item">
                <label>Role:</label>
                <span>
                  {submission.employeeInfo?.role ||
                    submission.employee?.role ||
                    submission.submittedBy?.role ||
                    "N/A"}
                </span>
              </div>
              <div className="info-item">
                <label>Department:</label>
                <span>
                  {submission.employeeInfo?.department ||
                    submission.department ||
                    submission.submittedBy?.department ||
                    "N/A"}
                </span>
              </div>
              <div className="info-item">
                <label>Review Period:</label>
                <span>
                  {submission.reviewPeriod ||
                    submission.employeeInfo?.reviewPeriod ||
                    "N/A"}
                </span>
              </div>
            </div>
          </section>

          {/* Goals (SOCIALLY DISTANCED SECTIONS) */}
          {submission.goals && submission.goals.length > 0 && (
            <section className="detail-section">
              <h3>Goals & Objectives</h3>
              <ul className="goals-list">
                {submission.goals.map((goal, index) => {
                  const isObject = goal && typeof goal === "object";
                  const descriptionText = isObject ? goal.description : goal;

                  return (
                    <li
                      key={goal?._id || index}
                      className="goal-container"
                      style={{
                        marginBottom: "32px",
                        paddingBottom: "16px",
                        borderBottom:
                          index !== submission.goals.length - 1
                            ? "2px dashed #e2e8f0"
                            : "none",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "1rem",
                          color: "black",
                          marginBottom: "12px",
                          transform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Goal {index + 1}
                      </h4>

                      {/* SECTION 1: Description Container */}
                      <div
                        className="goal-section-box description-box"
                        style={{
                          backgroundColor: "#f8fafc",
                          padding: "16px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          marginBottom: "14px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            color: "black",
                            textTransform: "uppercase",
                            marginBottom: "4px",
                          }}
                        >
                          Description
                        </div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            color: "#0f172a",
                            lineHeight: "1.5",
                          }}
                        >
                          {descriptionText || "Untitled Goal"}
                        </div>
                      </div>

                      {/* SECTION 2: Progress Metrics Track Container */}
                      {isObject && goal.progress !== undefined && (
                        <div
                          className="goal-section-box progress-box"
                          style={{
                            backgroundColor: "#f8fafc",
                            padding: "16px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            marginBottom: "14px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "between",
                              alignItems: "center",
                              marginBottom: "8px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "700",
                                color: "#070808",
                                textTransform: "uppercase",
                              }}
                            >
                              Progress Metrics
                            </span>
                            <span
                              style={{
                                marginLeft: "auto",
                                color: "#14b8a6",
                                fontWeight: "700",
                                fontSize: "0.95rem",
                              }}
                            >
                              {goal.progress}%
                            </span>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "8px",
                              backgroundColor: "#e2e8f0",
                              borderRadius: "4px",
                            }}
                          >
                            <div
                              style={{
                                width: `${goal.progress}%`,
                                height: "100%",
                                backgroundColor: "#14b8a6",
                                borderRadius: "4px",
                                transition: "width 0.3s ease",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* SECTION 3: Comments Block Container */}
                      {isObject &&
                        goal.comments &&
                        goal.comments.trim() !== "" && (
                          <div
                            className="goal-section-box comments-box"
                            style={{
                              backgroundColor: "#f8fafc",
                              padding: "16px",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "700",
                                color: "#050505",
                                textTransform: "uppercase",
                                marginBottom: "6px",
                              }}
                            >
                              Employee Comments
                            </div>
                            <div
                              style={{
                                fontSize: "0.9rem",
                                fontStyle: "italic",
                                color: "#050505",
                                backgroundColor: "#ffffff",
                                padding: "10px 14px",
                                borderRadius: "6px",
                                lineHeight: "1.4",
                              }}
                            >
                              "{goal.comments}"
                            </div>
                          </div>
                        )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Competencies */}
          {submission.competencies &&
            Object.keys(submission.competencies).length > 0 && (
              <section className="detail-section">
                <h3>Competencies</h3>
                <div className="competencies-grid">
                  {Object.entries(submission.competencies).map(
                    ([key, value]) => {
                      const ratingValue =
                        typeof value === "object" ? value.rating : value;
                      const feedbackText =
                        typeof value === "object" ? value.feedback : "";
                      if (!ratingValue) return null;
                      return (
                        <div key={key} className="competency-item">
                          <label>
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </label>
                          <div className="rating-display">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`star ${star <= ratingValue ? "filled" : ""}`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="rating-value">
                              ({ratingValue}/5)
                            </span>
                          </div>
                          {feedbackText && (
                            <p className="competency-feedback-display">
                              {feedbackText}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </section>
            )}

          {/* Growth Areas */}
          {submission.growthAreas &&
            Object.keys(submission.growthAreas).length > 0 && (
              <section className="detail-section">
                <h3>Growth Areas</h3>
                {Object.entries(submission.growthAreas).map(([key, values]) =>
                  Array.isArray(values) && values.length > 0 ? (
                    <div className="growth-subsection" key={key}>
                      <h4>
                        {key === "areas"
                          ? "Areas for Growth"
                          : key === "strengths"
                            ? "Strengths"
                            : key === "areasForImprovement"
                              ? "Areas for Improvement"
                              : key === "developmentGoals"
                                ? "Development Goals"
                                : key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <ul>
                        {values.map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null,
                )}
              </section>
            )}

          {/* Self Evaluation */}
          {submission.selfEvaluation && (
            <section className="detail-section">
              <h3>Self Evaluation</h3>
              {submission.selfEvaluation.accomplishments && (
                <div className="eval-item">
                  <h4>Accomplishments</h4>
                  <p>{submission.selfEvaluation.accomplishments}</p>
                </div>
              )}

              {submission.selfEvaluation.challenges && (
                <div className="eval-item">
                  <h4>Challenges</h4>
                  <p>{submission.selfEvaluation.challenges}</p>
                </div>
              )}

              {submission.selfEvaluation.learnings && (
                <div className="eval-item">
                  <h4>Learnings</h4>
                  <p>{submission.selfEvaluation.learnings}</p>
                </div>
              )}

              {submission.selfEvaluation.futureGoals && (
                <div className="eval-item">
                  <h4>Future Goals</h4>
                  <p>{submission.selfEvaluation.futureGoals}</p>
                </div>
              )}
            </section>
          )}

          {/* Overall Rating */}
          {submission.overallRating && (
            <section className="detail-section">
              <h3>Overall Rating</h3>
              <div className="overall-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star-large ${star <= submission.overallRating ? "filled" : ""}`}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-text">
                  {submission.overallRating}/5
                </span>
              </div>
            </section>
          )}

          {/* Manager Input (Only if pending) */}
          {isManager && submission.status === "pending" && (
            <section className="detail-section manager-review-section">
              <h3>Manager Review</h3>
              <div className="form-group">
                <label>Rating:</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= rating ? "active" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Feedback:</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback on this submission..."
                  rows={6}
                />
              </div>
            </section>
          )}

          {/* View existing feedback if already reviewed */}
          {!isManager &&
            (submission.managerFeedback || submission.feedback) && (
              <section className="detail-section">
                <h3>Manager Feedback</h3>
                <div className="feedback-display">
                  <p>
                    <strong>Rating:</strong>{" "}
                    {submission.managerFeedback?.rating || submission.rating}
                    /5
                  </p>
                  <p>
                    <strong>Comments:</strong>{" "}
                    {submission.managerFeedback?.feedback ||
                      submission.feedback}
                  </p>
                </div>
              </section>
            )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>

          {isManager && submission.status === "pending" && (
            <button className="btn-primary" onClick={submitReview}>
              Approve & Submit Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
