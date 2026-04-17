import React from "react";
import { Target } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function GoalsSection({ goals = [], onGoalsChange }) {
  const addGoal = () => {
    onGoalsChange([
      ...goals,
      { description: "", progress: 0, comments: "" },
    ]);
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
        <h2 className="section-title section-title-bold" style={{ marginBottom: 0 }}>
          <Target className="section-icon" />
          Goals & Objectives
        </h2>
        <div className="add-button-container">
          <button className="add-button" type="button" onClick={addGoal}>
            + Add Goal
          </button>
        </div>
      </div>
      {goals.map((goal, index) => (
        <div key={index} className="item-container">
          <div className="form-group">
            <label className="form-label">Goal {index + 1}</label>
            <label className="form-label-small">Description</label>
            <textarea
              placeholder="Describe the goal..."
              rows="2"
              className="form-textarea"
              value={goal.description}
              onChange={(e) => updateGoal(index, "description", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Progress ({goal.progress}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => updateGoal(index, "progress", Number(e.target.value))}
              className="progress-slider"
              style={{ "--value": `${goal.progress}%` }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Comments</label>
            <textarea
              placeholder="Additional comments..."
              rows="2"
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
