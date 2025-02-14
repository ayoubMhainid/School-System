import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const updateUserCredentials = async (token,data) =>{
    const response = await axios.put(`${apiUrl}/user/updateUserData/${data.id}`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}