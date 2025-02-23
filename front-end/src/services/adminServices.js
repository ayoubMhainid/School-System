import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;

export const getAdmins = async (token,page) =>{
    const response = await axios.get(`${apiUrl}/admin/getAdmins?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const createAdmin = async (token, data) => {
  const response = await axios.post(`${apiUrl}/admin/createAdmin`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};


export const updateAdminData = async (token,data) => {
  const response = await axios.put(`${apiUrl}/admin/updateAdminData`,data, {
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}