import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function GrowthAreas() {
  const [areas, setAreas] = useState([{ id: 1 }]);

  const addArea = () => {
    setAreas([...areas, { id: areas.length + 1 }]);
  };

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">
          <TrendingUp className="section-icon" />
          Areas for Growth
        </h2>
        <button className="add-button" onClick={addArea}>
          + Add Area
        </button>
      </div>
      {areas.map((area) => (
        <div key={area.id} className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder={`Growth area ${area.id}`}
          />
        </div>
      ))}
    </section>
  );
}
