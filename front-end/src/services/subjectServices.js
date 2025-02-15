import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getSubjects = async (token,page) => {
  const response = await axios.get(
    `${apiUrl}/subject/getSubjects?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};