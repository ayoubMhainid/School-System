import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getStudents = async (token, page) => {
  const response = await axios.get(
    `${apiUrl}/student/getStudents?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const searchStudents = async (token, username) => {
  const response = await axios.get(
    `${apiUrl}/student/searchStudentsByUsername/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getStudentsByClass = async (token, class_id) => {
  const response = await axios.get(
    `${apiUrl}/student/filterStudentsByClass/${class_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const filterStudentsByGender = async (token, gender) => {
  const response = await axios.get(
    `${apiUrl}/student/filterStudentsByGender/${gender}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const createStudent = async (token, data) => {
  const response = await axios.post(`${apiUrl}/student/createStudent`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
