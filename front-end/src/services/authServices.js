import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const checkUserLogin = async (data) => {
  const response = await axios.post(`${apiUrl}/auth/checkUserLogin`, data);
  return response;
};
