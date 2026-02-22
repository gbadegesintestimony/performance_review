const BASE_URL = "http://localhost:5000/api/reviews";

const getToken = () => localStorage.getItem("token");

export const createReview = async (data) => {
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
