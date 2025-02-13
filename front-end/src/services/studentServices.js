import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getStudents = async (token,page) =>{
    const response = await axios.get(`${apiUrl}/student/getStudents?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return response;
}