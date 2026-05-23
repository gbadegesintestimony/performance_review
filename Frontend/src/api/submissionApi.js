// src/api/submissionApi.js
import { API_ENDPOINTS } from "../config/api";

const getToken = () => localStorage.getItem("token");

export const createSubmission = async (data) => {
  try {
    const res = await fetch(API_ENDPOINTS.submissions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create submission");
    }

    return await res.json();
  } catch (error) {
    console.error("Create submission error:", error);
    throw error;
  }
};

export const getPendingSubmissions = async () => {
  try {
    const res = await fetch(`${API_ENDPOINTS.submissions}/pending`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch submissions");
    }

    return await res.json();
  } catch (error) {
    console.error("Get pending submissions error:", error);
    throw error;
  }
};

export const getMySubmissions = async () => {
  try {
    const res = await fetch(`${API_ENDPOINTS.submissions}/my-submissions`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch my submissions");
    }

    return await res.json();
  } catch (error) {
    console.error("Get my submissions error:", error);
    throw error;
  }
};

export const reviewSubmission = async (submissionId, reviewData) => {
  try {
    // SECURITY CHECK: Ensure submissionId is a string
    const id =
      typeof submissionId === "object" ? submissionId._id : submissionId;

    const res = await fetch(`${API_ENDPOINTS.submissions}/${id}/review`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to review submission");
    }

    return await res.json();
  } catch (error) {
    console.error("Review submission error:", error);
    throw error;
  }
};
