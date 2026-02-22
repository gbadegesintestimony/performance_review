const BASE_URL = "http://localhost:5000/api/submissions";

const getToken = () => localStorage.getItem("token");

export const createSubmission = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getPendingSubmissions = async () => {
  const res = await fetch(`${BASE_URL}/pending`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};
