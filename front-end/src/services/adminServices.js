import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createAdmin = async (token, data) => {
  const response = await axios.post(`${apiUrl}/admin/createAdmin`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
