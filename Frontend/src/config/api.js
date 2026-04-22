const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/api/auth`,
  submissions: `${API_BASE_URL}/api/submissions`,
  reviews: `${API_BASE_URL}/api/reviews`,
};

export default API_BASE_URL;
