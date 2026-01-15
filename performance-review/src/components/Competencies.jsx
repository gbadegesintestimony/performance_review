import React from "react";
import { Award } from "lucide-react";
import CompetencyRating from "./competencyRating";
import Achievements from "./Achievements";
import "../styles/section.css";

const competenciesData = {
  ic: [],
  "senior-ic": [
    "Technical Excellence",
    "Mentorship",
    "Strategic Thinking",
    "Cross-team Collaboration",
    "Innovation",
    "Technical Leadership",
    "Documentation & Knowledge Sharing",
    "Decision Making",
    "Change Management",
    "Resource Allocation",
  ],
  manager: [
    "Team Leadership",
    "People Development",
    "Strategic Planning",
    "Performance Management",
    "Stakeholder Management",
    "Decision Making",
    "Change Management",
    "Resource Allocation",
  ],
};

export default function Competencies({ selectedRole }) {
  const competencies = competenciesData[selectedRole] || [];
  const roleTitle =
    selectedRole === "ic"
      ? "Individual Contributor"
      : selectedRole === "senior-ic"
      ? "Senior Individual Contributor"
      : "Manager";

  return (
    <>
      <section className="section">
        <h2 className="section-title section-title-bold">
          <Award className="section-icon" />
          Competencies ({roleTitle})
        </h2>
        {competencies.length === 0 ? (
          <p className="section-subtitle">
            Select a role to see relevant competencies
          </p>
        ) : (
          <>
            {competencies.map((competency, index) => (
              <CompetencyRating key={index} competency={competency} />
            ))}
          </>
        )}
      </section>

      <Achievements />
    </>
  );
}
