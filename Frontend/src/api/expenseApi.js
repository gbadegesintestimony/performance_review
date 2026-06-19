import { API_ENDPOINTS } from "../config/api";

const getToken = () => localStorage.getItem("token");

export const createExpense = async (data) => {
  try {
    const res = await fetch(API_ENDPOINTS.expenses, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });

    const payload = await res.json();

    if (!res.ok) {
      throw new Error(payload.message || "Failed to create expense");
    }

    return payload;
  } catch (error) {
    console.error("Create expense error:", error);
    throw error;
  }
};
