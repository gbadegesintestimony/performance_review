import React from "react";
import { MessageSquare } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function SelfEvaluation({ selfEvaluation = {}, onSelfEvaluationChange }) {
  const handleChange = (field, value) => {
    onSelfEvaluationChange({ ...selfEvaluation, [field]: value });
  };

  return (
    <section className="section">
      <h2 className="section-title section-title-bold">
        <MessageSquare className="section-icon" />
        Self Evaluation
      </h2>
      <div className="form-group">
        <label className="form-label">Accomplishments</label>
        <textarea
          placeholder="What went well?"
          rows="4"
          className="form-textarea"
          value={selfEvaluation.accomplishments || ""}
          onChange={(e) => handleChange("accomplishments", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Challenges</label>
        <textarea
          placeholder="What challenges did you face?"
          rows="4"
          className="form-textarea"
          value={selfEvaluation.challenges || ""}
          onChange={(e) => handleChange("challenges", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Learnings</label>
        <textarea
          placeholder="What did you learn?"
          rows="4"
          className="form-textarea"
          value={selfEvaluation.learnings || ""}
          onChange={(e) => handleChange("learnings", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Future Goals</label>
        <textarea
          placeholder="What are your next priorities?"
          rows="4"
          className="form-textarea"
          value={selfEvaluation.futureGoals || ""}
          onChange={(e) => handleChange("futureGoals", e.target.value)}
        />
      </div>
    </section>
  );
}
