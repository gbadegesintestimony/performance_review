import { API_ENDPOINTS } from "../config/api";

const getToken = () => localStorage.getItem("token");

const requestJson = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {}),
    },
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
};

export const getMyFormTemplates = async () => {
  return requestJson(`${API_ENDPOINTS.forms}/my-forms`, { method: "GET" });
};

export const createFormTemplate = async (data) => {
  return requestJson(API_ENDPOINTS.forms, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateFormTemplate = async (id, data) => {
  return requestJson(`${API_ENDPOINTS.forms}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
