import React, { useState } from "react";
import { Star } from "lucide-react";
import "../styles/section.css";
import "../styles/rating.css";

export default function Rating() {
  const [rating, setRating] = useState(0);

  const ratingLabels = [
    "Needs Improvement",
    "Developing",
    "Meets",
    "Exceeds",
    "Outstanding",
  ];

  return (
    <section className="section">
      <h2 className="section-title section-title-bold">
        <Star className="section-icon" />
        Overall Rating *
      </h2>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="rating-item">
            <button
              onClick={() => setRating(star)}
              className="rating-button"
              aria-label={`Rate ${ratingLabels[star - 1]}`}
            >
              <Star
                className={`rating-star ${
                  rating >= star ? "rating-star-active" : ""
                }`}
              />
            </button>
            <span className="rating-label">{ratingLabels[star - 1]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
