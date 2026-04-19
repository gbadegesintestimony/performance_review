// Frontend/src/components/SubmissionDetailModal.jsx - SHOWS ALL IC DATA
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
  const [rating, setRating] = useState(3);

  const handleApprove = () => {
    if (isManager) {
      if (!feedback.trim()) {
        alert("Please provide feedback before approving");
        return;
      }

      onApprove({
        rating,
        feedback,
        reviewedBy: currentUser._id,
        reviewerName: currentUser.name,
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>
              {submission.title ||
                `${submission.reviewPeriod} Performance Review`}
            </h2>
            <p className="modal-subtitle">
              Submitted by{" "}
              {submission.employee?.name ||
                submission.employeeInfo?.name ||
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
                    "N/A"}
                </span>
              </div>
              <div className="info-item">
                <label>Department:</label>
                <span>
                  {submission.employeeInfo?.department ||
                    submission.department ||
                    "N/A"}
                </span>
              </div>
              <div className="info-item">
                <label>Review Period:</label>
                <span>{submission.reviewPeriod}</span>
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

          {/* Manager Review Section (Only for managers on pending submissions) */}
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

          {/* Previous Manager Feedback (for reviewed submissions) */}
          {submission.managerFeedback && (
            <section className="detail-section">
              <h3>Manager Feedback</h3>
              <div className="feedback-display">
                <div className="feedback-rating">
                  <label>Rating:</label>
                  <div className="rating-display">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= submission.managerFeedback.rating ? "filled" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="feedback-comments">
                  <label>Comments:</label>
                  <p>
                    {submission.managerFeedback.feedback ||
                      submission.managerFeedback.comments ||
                      "No feedback provided"}
                  </p>
                </div>
                <div className="feedback-meta">
                  <span>
                    Reviewed by:{" "}
                    {submission.managerFeedback.reviewerName || "Manager"}
                  </span>
                  {submission.managerFeedback.reviewedAt && (
                    <span>
                      On:{" "}
                      {new Date(
                        submission.managerFeedback.reviewedAt,
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>

          {isManager && submission.status === "pending" && (
            <button className="btn-primary" onClick={handleApprove}>
              Approve & Submit Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailModal;
