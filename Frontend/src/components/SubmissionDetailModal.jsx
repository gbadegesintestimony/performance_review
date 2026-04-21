// Frontend/src/components/SubmissionDetailModal.jsx
import React, { useState } from "react";
import "../styles/SubmissionDetailModal.css";

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
                submission.submittedBy}{" "}
              • {submission.timeAgo || "recently"}
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
                  {submission.role || submission.employee?.role || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <label>Department:</label>
                <span>{submission.department || "N/A"}</span>
              </div>
              <div className="info-item">
                {/* <label>Review Period:</label> */}
                <span>
                  {/* {submission.employeeInfo?.reviewPeriod ||
                    submission.reviewPeriod ||
                    "N/A"} */}
                </span>
              </div>
            </div>
          </section>
          {/* Goals */}
          {submission.goals && submission.goals.length > 0 && (
            <section className="detail-section">
              <h3>Goals</h3>
              <ul className="goals-list">
                {submission.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
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
                      // Skip if rating is 0 or undefined
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
