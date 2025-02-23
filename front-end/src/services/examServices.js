import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createExam = async (token, data) => {
  const response = await axios.post(`${apiUrl}/exam/createExam`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
