import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createTeacher = async (token, data) => {
  const response = await axios.post(`${apiUrl}/teacher/createTeacher`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const getTeachers = async (token) =>{
  const response = await axios.get(`${apiUrl}/teacher/getTeachers`,{
      headers : {
          Authorization : `Bearer ${token}`
      }
  });
  return response;
}