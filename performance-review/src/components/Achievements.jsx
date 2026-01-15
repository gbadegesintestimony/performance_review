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
      <div className="section-header-flex">
        <h2 className="section-title section-title-bold">
          <TrendingUp className="section-icon" />
          Key Achievements
        </h2>
        <button className="add-button" onClick={addAchievement}>
          + Add Achievement
        </button>
      </div>

      {achievements.map((achievement, index) => (
        <div key={achievement.id} className="item-container">
          <h4 className="form-label-small">Achievement {index + 1}</h4>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              placeholder="What did you accomplish?"
              rows="2"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Business Impact</label>
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
