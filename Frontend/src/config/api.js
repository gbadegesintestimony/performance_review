// Prefer an explicit env value, then fall back to a sensible default per mode.
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "production"
    ? "https://performance-review-di35.onrender.com"
    : "http://localhost:5000")
).replace(/\/$/, "");

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/api/auth`,
  expenses: `${API_BASE_URL}/api/expenses`,
  forms: `${API_BASE_URL}/api/forms`,
  submissions: `${API_BASE_URL}/api/submissions`,
  reviews: `${API_BASE_URL}/api/reviews`,
};

export default API_BASE_URL;
