import React, { useState } from "react";
import { Target } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function GoalsSection() {
  const [goals, setGoals] = useState([{ id: 1, progress: 0 }]);

  const addGoal = () => {
    setGoals([...goals, { id: goals.length + 1, progress: 0 }]);
  };

  const updateProgress = (id, value) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, progress: value } : goal
      )
    );
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
        <div className="add-button-container">
          <button className="add-button" onClick={addGoal}>
            + Add Goal
          </button>
        </div>
      </div>
      {goals.map((goal, index) => (
        <div key={goal.id} className="item-container">
          <div className="form-group">
            <label className="form-label">Goal {goal.id}</label>
            <label className="form-label-small">Description</label>
            <textarea
              placeholder="Describe the goal..."
              rows="2"
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Progress ({goal.progress}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => updateProgress(goal.id, e.target.value)}
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
            />
          </div>
        </div>
      ))}
    </section>
  );
}
