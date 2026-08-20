import React, { useState } from "react";
import { registerUser, loginUser } from "../api/auth";
import "../styles/AuthView.css";

const AuthView = ({ onLogin, initialMode = "login", onBackToLanding }) => {
  const [isLogin, setIsLogin] = useState(initialMode !== "register");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    employeeId: "",
    department: "",
    role: "ic", // Changed default to match a lowercase option value
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      delete newErrors.general;
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password needs at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password needs at least one number";
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.employeeId) {
        newErrors.employeeId = "Employee ID is required";
      }
      if (!formData.department) {
        newErrors.department = "Department is required";
      }
      if (!formData.role) {
        newErrors.role = "Role selection is required";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        if (response.success && response.data) {
          const { token, _id, firstName, lastName, email, role, department } =
            response.data;

          localStorage.setItem("token", token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              _id,
              name: `${firstName} ${lastName}`,
              email,
              role,
              department,
            }),
          );

          if (onLogin) {
            onLogin({
              _id,
              firstName,
              lastName,
              email,
              role,
              department,
            });
          }
        } else {
          setErrors({
            email: response.message || "Login failed. Please try again.",
          });
        }
      } else {
        // ✅ Normalized matching mechanism preventing data leaking from departments
        let formattedRole = "IC";
        const selectedRole = String(formData.role).toLowerCase();

        if (selectedRole === "senioric") {
          formattedRole = "SeniorIC";
        } else if (selectedRole === "manager") {
          formattedRole = "Manager";
        }

        const response = await registerUser({
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          employeeId: formData.employeeId,
          department: formData.department,
          role: formattedRole,
        });

        if (response.success && response.data) {
          alert("Registration successful! Please login with your credentials.");
          setIsLogin(true);
          setFormData({
            email: formData.email,
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            employeeId: "",
            department: "",
            role: "ic",
          });
        } else {
          setErrors({
            email: response.message || "Registration failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      const serverMessage = error.message;
      const displayMessage =
        serverMessage === "Failed to fetch"
          ? "Server is currently offline. Please check your connection."
          : serverMessage;
      setErrors({
        general: displayMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      employeeId: "",
      department: "",
      role: "ic",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {onBackToLanding && (
          <button
            type="button"
            className="auth-back-btn"
            onClick={onBackToLanding}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              marginBottom: "1rem",
              padding: "0.4rem 0.6rem",
              borderRadius: "6px",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0f172a")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            ← Back to Home
          </button>
        )}
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#2d9d8e" />
                <circle
                  cx="24"
                  cy="24"
                  r="13"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M24 14 L24 24 L30 27"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="auth-subtitle">{isLogin ? "Sign in" : ""}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-banner">{errors.general}</div>
            )}

            {!isLogin && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="employeeId">Employee ID</label>
                    <input
                      type="text"
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className={errors.employeeId ? "error" : ""}
                      placeholder="EMP001"
                    />
                    {errors.employeeId && (
                      <span className="error-message">{errors.employeeId}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={errors.department ? "error" : ""}
                    >
                      <option value="">Select Department</option>
                      <option value="engineering">Engineering</option>
                      <option value="sales">Sales</option>
                      <option value="marketing">Marketing</option>
                      <option value="hr">Human Resources</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                    </select>
                    {errors.department && (
                      <span className="error-message">{errors.department}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={errors.role ? "error" : ""}
                  >
                    <option value="ic">IC</option>
                    <option value="senioric">SeniorIC</option>
                    <option value="manager">Manager</option>
                  </select>
                  {errors.role && (
                    <span className="error-message">{errors.role}</span>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="you@company.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                  placeholder="confirm your password"
                />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleMode} className="toggle-mode-btn">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
