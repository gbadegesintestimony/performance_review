import React from "react";
import { MessageSquare } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function SelfEvaluation() {
  return (
    <section className="section">
      <h2 className="section-title section-title-bold">
        <MessageSquare className="section-icon" />
        Self Evaluation
      </h2>
      <div className="form-group">
        <label className="form-label">Overall Self-Assessment</label>
        <textarea
          placeholder="Reflect on your performance during this review period. What went well? What could have been better?"
          rows="5"
          className="form-textarea"
        />
      </div>
    </section>
  );
}
