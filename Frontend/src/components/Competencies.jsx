import React from "react";
import { Award } from "lucide-react";
import CompetencyRating from "./competencyRating";
import "../styles/section.css";

const competenciesData = {
  ic: [
    "Technical Excellence",
    "Problem Solving",
    "Communication",
    "Teamwork",
    "Time Management",
  ],
  "senior-ic": [
    "Technical Excellence",
    "Mentorship",
    "Strategic Thinking",
    "Cross-team Collaboration",
    "Innovation",
    "Technical Leadership",
  ],
  manager: [
    "Team Leadership",
    "People Development",
    "Strategic Planning",
    "Performance Management",
    "Stakeholder Management",
    "Decision Making",
    "Change Management",
  ],
};

export default function Competencies({ selectedRole, competencies = {}, onCompetenciesChange }) {
  const competencyLabels = competenciesData[selectedRole] || [];
  const roleTitle =
    selectedRole === "ic"
      ? "Individual Contributor"
      : selectedRole === "senior-ic"
      ? "Senior Individual Contributor"
      : "Manager";

  const updateRating = (competency, rating) => {
    onCompetenciesChange({ ...competencies, [competency]: rating });
  };

  return (
    <section className="section">
      <h2 className="section-title section-title-bold">
        <Award className="section-icon" />
        Competencies ({roleTitle})
      </h2>
      {competencyLabels.length === 0 ? (
        <p className="section-subtitle">
          Select a role to see relevant competencies
        </p>
      ) : (
        <div className="competency-list">
          {competencyLabels.map((competency, index) => (
            <CompetencyRating
              key={index}
              competency={competency}
              rating={competencies[competency] || 0}
              onRatingChange={(value) => updateRating(competency, value)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
