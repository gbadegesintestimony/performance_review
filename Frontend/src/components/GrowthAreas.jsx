import React, { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function GrowthAreas({
  growthAreas = { areas: [] },
  onGrowthAreasChange,
}) {
  const areas = growthAreas.areas || [];

  useEffect(() => {
    if (areas.length === 0) {
      onGrowthAreasChange({ areas: [""] });
    }
  }, [areas, onGrowthAreasChange]);

  const addArea = () => {
    onGrowthAreasChange({ areas: [...areas, ""] });
  };

  const updateArea = (index, value) => {
    const updated = areas.map((area, idx) => (idx === index ? value : area));
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
      {areas.map((area, index) => (
        <div key={index} className="form-group growth-area-item">
          <input
            type="text"
            className="form-input"
            placeholder={`Growth area ${index + 1}`}
            value={area}
            onChange={(e) => updateArea(index, e.target.value)}
          />
          {areas.length > 1 && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removeArea(index)}
            >
              Remove Growth
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
