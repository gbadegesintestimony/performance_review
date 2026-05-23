// src/api/reviewApi.js
import { API_ENDPOINTS } from "../config/api";

const getToken = () => localStorage.getItem("token");

export const createReview = async (data) => {
  try {
    const res = await fetch(API_ENDPOINTS.reviews, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create review");
    }

    return await res.json();
  } catch (error) {
    console.error("Create review error:", error);
    throw error;
  }
};
