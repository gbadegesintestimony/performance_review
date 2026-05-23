const API_BASE_URL = (
  import.meta.env.MODE === "production"
    ? "https://performance-review-di35.onrender.com"
    : "http://localhost:5000"
).replace(/\/$/, "");

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/api/auth`,
  submissions: `${API_BASE_URL}/api/submissions`,
  reviews: `${API_BASE_URL}/api/reviews`,
};

export default API_BASE_URL;
