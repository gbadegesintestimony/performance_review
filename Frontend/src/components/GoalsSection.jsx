// Frontend/src/components/GoalsSection.jsx - SIMPLE VERSION LIKE IMAGE 4
import React, { useEffect } from "react";
import { Target } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function GoalsSection({ goals = [], onGoalsChange }) {
  // ✅ Add default goal on mount if empty
  useEffect(() => {
    if (goals.length === 0) {
      onGoalsChange([{ description: "", comments: "" }]);
    }
  }, []);

  const addGoal = () => {
    onGoalsChange([...goals, { description: "", comments: "" }]);
  };

  const updateGoal = (index, field, value) => {
    const updatedGoals = goals.map((goal, idx) =>
      idx === index ? { ...goal, [field]: value } : goal,
    );
    onGoalsChange(updatedGoals);
  };

  const removeGoal = (index) => {
    onGoalsChange(goals.filter((_, idx) => idx !== index));
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2
          className="section-title section-title-bold"
          style={{ marginBottom: 0 }}
        >
          <Target className="section-icon" />
          Goals & Objectives
        </h2>
        {/* <div className="add-button-container"> */}
        <button className="add-button" type="button" onClick={addGoal}>
          + Add Goal
        </button>
        {/* </div> */}
      </div>
      {goals.map((goal, index) => (
        <div key={index} className="item-container">
          <div className="form-group">
            <label className="form-label">Goal {index + 1}</label>
            <label className="form-label-small">Description</label>
            <textarea
              placeholder="Describe the goal..."
              rows="3"
              className="form-textarea"
              value={goal.description}
              onChange={(e) => updateGoal(index, "description", e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label
              className="form-label-small"
              style={{
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              Progress ({goal.progress || 0}%)
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="progress-slider"
            value={goal.progress || 0}
            onChange={(e) => updateGoal(index, "progress", e.target.value)}
            style={{ "--value": `${goal.progress || 0}%` }}
          />
          <div className="form-group">
            <label className="form-label-small">Comments</label>
            <textarea
              placeholder="Additional comments..."
              rows="3"
              className="form-textarea"
              value={goal.comments}
              onChange={(e) => updateGoal(index, "comments", e.target.value)}
            />
          </div>

          {goals.length > 1 && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removeGoal(index)}
            >
              Remove Goal
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
