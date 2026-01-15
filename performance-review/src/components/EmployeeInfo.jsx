import React from "react";
import { Briefcase } from "lucide-react";
import "../styles/section.css";
import "../styles/form.css";

export default function EmployeeInfo() {
  return (
    <section className="section">
      <h2 className="section-title section-title-bold">
        <Briefcase className="section-icon" />
        Employee Information
      </h2>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Employee Name *</label>
          <input type="text" placeholder="Full name" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Review Period *</label>
          <select className="form-input form-select">
            <option value="">Select period</option>
            <option value="q1-2024">Q1 2024</option>
            <option value="q2-2024">Q2 2024</option>
            <option value="q3-2024">Q3 2024</option>
            <option value="q4-2024">Q4 2024</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <select className="form-input form-select">
            <option value="">Select department</option>
            <option value="sales">Sales</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="hr">Human Resources</option>
          </select>
        </div>
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
