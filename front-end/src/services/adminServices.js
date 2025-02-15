import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;

export const getAdmins = async (token) =>{
    const response = await axios.get(`${apiUrl}/admin/getAdmins`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}