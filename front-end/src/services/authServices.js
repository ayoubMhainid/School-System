import axios from "axios";

export const checkUserLogin = async (data) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/checkUserLogin",
    data
  );
  return response;
};
