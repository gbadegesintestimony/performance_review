import React, { useState } from "react";
import { Star } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";
import "../styles/rating.css";

export default function CompetencyRating({ competency }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="competency-item">
      <div className="competency-header">
        <h3 className="competency-title">{competency}</h3>
        <div className="competency-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="competency-star-button"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`competency-star ${
                  rating >= star ? "competency-star-active" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <textarea
        placeholder="Provide specific examples or feedback..."
        rows="2"
        className="form-textarea"
      />
    </div>
  );
}
