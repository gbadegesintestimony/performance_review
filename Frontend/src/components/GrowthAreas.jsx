import React, { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function GrowthAreas({
  growthAreas = { areas: [] },
  onGrowthAreasChange,
}) {
  const areas = growthAreas.areas || [];

  // Initialize with one clean object block if empty
  useEffect(() => {
    if (areas.length === 0) {
      onGrowthAreasChange({
        areas: [{ strengths: "", improvements: "", developmentGoals: "" }],
      });
    }
  }, [areas, onGrowthAreasChange]);

  // Adds a brand new, empty, independent block set of three fields
  const addArea = () => {
    onGrowthAreasChange({
      areas: [
        ...areas,
        { strengths: "", improvements: "", developmentGoals: "" },
      ],
    });
  };

  // Safely updates a single targeted text property inside a specific block container index
  const updateAreaField = (index, fieldName, value) => {
    const updated = areas.map((area, idx) => {
      if (idx === index) {
        return { ...area, [fieldName]: value };
      }
      return area;
    });
    onGrowthAreasChange({ areas: updated });
  };

  const removeArea = (index) => {
    if (areas.length > 1) {
      onGrowthAreasChange({ areas: areas.filter((_, idx) => idx !== index) });
    }
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="title-group">
          <TrendingUp className="section-icon" />
          <h2 className="section-title section-title-bold">Areas for Growth</h2>
        </div>

        <button className="add-button" type="button" onClick={addArea}>
          + Add Area
        </button>
      </div>

      {/*  Loop exactly once over the object collection block structures */}
      {areas.map((area, index) => (
        <div
          key={index}
          className="growth-area-block"
          style={{
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom:
              areas.length > 1 && index !== areas.length - 1
                ? "1px dashed #e2e8f0"
                : "none",
          }}
        >
          <h4
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "#475569",
              marginBottom: "12px",
            }}
          >
            {/* Area Group {index + 1} */}
          </h4>

          {/* Field 1: Strengths */}
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <p style={{ fontWeight: "500", marginBottom: "4px" }}>Strengths</p>
            <input
              type="text"
              className="form-input"
              placeholder="Growth area strengths"
              value={area.strengths || ""}
              onChange={(e) =>
                updateAreaField(index, "strengths", e.target.value)
              }
            />
          </div>

          {/* Field 2: Areas For Improvement */}
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <p style={{ fontWeight: "500", marginBottom: "4px" }}>
              Areas For Improvement
            </p>
            <input
              type="text"
              className="form-input"
              placeholder="Growth area improvement items"
              value={area.improvements || ""}
              onChange={(e) =>
                updateAreaField(index, "improvements", e.target.value)
              }
            />
          </div>

          {/* Field 3: Development Goals */}
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <p style={{ fontWeight: "500", marginBottom: "4px" }}>
              Development Goals
            </p>
            <input
              type="text"
              className="form-input"
              placeholder="Growth area milestones"
              value={area.developmentGoals || ""}
              onChange={(e) =>
                updateAreaField(index, "developmentGoals", e.target.value)
              }
            />
          </div>

          {/* Clean layout delete button grouping per set block container */}
          {areas.length > 1 && (
            <button
              type="button"
              className="remove-button"
              style={{
                cursor: "pointer",
              }}
              onClick={() => removeArea(index)}
            >
              Remove Area
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
