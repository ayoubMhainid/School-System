import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAttendance = async (token, page) => {
  const response = await axios.get(
    `${apiUrl}/attendancesTeacher/getAttendancesTeacher?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const addAttendanceTeacher = async (token, data) => {
  const response = await axios.post(
    `${apiUrl}/attendancesTeacher/createAttendanceTeacher/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteAttendance = async (token, id) => {
  const response = await axios.delete(
    `${apiUrl}/attendance/deleteAttendance/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
