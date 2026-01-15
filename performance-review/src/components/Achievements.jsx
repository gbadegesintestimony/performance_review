import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function Achievements() {
  const [achievements, setAchievements] = useState([{ id: 1 }]);

  const addAchievement = () => {
    setAchievements([...achievements, { id: achievements.length + 1 }]);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2
          className="section-title section-title-bold"
          style={{ marginBottom: 0 }}
        >
          <TrendingUp className="section-icon" />
          Key Achievements
        </h2>
        <div className="add-button-container">
          <button className="add-button" onClick={addAchievement}>
            + Add Achievement
          </button>
        </div>
      </div>
      {achievements.map((achievement) => (
        <div key={achievement.id} className="item-container">
          <div className="form-group">
            <label className="form-label-small">
              Achievement {achievement.id}
            </label>
            <label className="form-label-small">Description</label>
            <textarea
              placeholder="What did you accomplish?"
              rows="2"
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label className="form-label-small">Business Impact</label>
            <textarea
              placeholder="How did this impact the team/company?"
              rows="2"
              className="form-textarea"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
