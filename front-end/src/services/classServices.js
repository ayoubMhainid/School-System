import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getClasses = async (token) =>{
    const response = await axios.get(`${apiUrl}/class/getClasses`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}