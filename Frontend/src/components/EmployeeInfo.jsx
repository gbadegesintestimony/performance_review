// Frontend/src/components/EmployeeInfo.jsx
import React, { useState, useEffect, useRef } from "react";
import { Briefcase, ChevronDown } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function EmployeeInfo({ user, selectedPeriod, onPeriodChange }) {
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  // Refs to detect clicks outside the dropdowns
  const deptRef = useRef(null);
  const periodRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (deptRef.current && !deptRef.current.contains(event.target)) {
        setIsDeptOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target)) {
        setIsPeriodOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
  ];
  const periods = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Annual 2024"];

  // Use the user profile values directly to avoid cascading render side-effects
  const currentDepartment = user?.department || "";

  return (
    <section className="section">
      <h2 className="section-title section-title-bold">
        <Briefcase className="section-icon" /> Employee Information
      </h2>
      <div className="form-grid">
        {/* Employee Name */}
        <div className="form-group">
          <label className="form-label">Employee Name *</label>
          <input
            type="text"
            placeholder="Full name"
            className="form-input"
            value={user?.name || ""}
            readOnly
          />
        </div>

        {/* Review Period */}
        <div className="form-group" ref={periodRef}>
          <label className="form-label">Review Period *</label>
          <div className="custom-select-container">
            <div
              className={`custom-select-header ${
                !selectedPeriod ? "placeholder" : ""
              }`}
              onClick={() => setIsPeriodOpen(!isPeriodOpen)}
            >
              <span className="truncate">
                {selectedPeriod || "Select period"}
              </span>
              <ChevronDown
                className={`select-arrow ${isPeriodOpen ? "open" : ""}`}
              />
            </div>
            {isPeriodOpen && (
              <div className="custom-select-dropdown">
                {periods.map((p) => (
                  <div
                    key={p}
                    className="custom-select-option"
                    onClick={() => {
                      if (onPeriodChange) {
                        onPeriodChange(p);
                      }
                      setIsPeriodOpen(false);
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Department */}
        <div className="form-group" ref={deptRef}>
          <label className="form-label">Department</label>
          <div className="custom-select-container">
            <div
              className={`custom-select-header ${
                !currentDepartment ? "placeholder" : ""
              }`}
              onClick={() => setIsDeptOpen(!isDeptOpen)}
            >
              <span
                className="truncate"
                style={{ textTransform: "capitalize" }}
              >
                {currentDepartment || "Select department"}
              </span>
              <ChevronDown
                className={`select-arrow ${isDeptOpen ? "open" : ""}`}
              />
            </div>
            {isDeptOpen && (
              <div className="custom-select-dropdown">
                {departments.map((d) => (
                  <div
                    key={d}
                    className="custom-select-option"
                    onClick={() => {
                      // Handled strictly as read-only profile sync or left open for extension
                      setIsDeptOpen(false);
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Manager Name */}
        <div className="form-group">
          <label className="form-label">Manager Name</label>
          <input
            type="text"
            placeholder="Manager's name"
            className="form-input"
          />
        </div>
      </div>
    </section>
  );
}
