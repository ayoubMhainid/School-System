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

export const getExams = async (token) => {
  const response = await axios.get(`${apiUrl}/exam/getExams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateExam = async (token, exam_id, data) => {
  const response = await axios.put(
    `${apiUrl}/exam/updateExam/${exam_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteExam = async (token, exam_id) => {
  const response = await axios.delete(`${apiUrl}/exam/deleteExam/${exam_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
