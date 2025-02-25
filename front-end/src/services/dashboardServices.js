import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;

export const getAdminDashboardData = async (token) =>{
    const response = await axios.get(`${apiUrl}/dashboard/getAdmindashboardData`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}