import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


export const getMark = async (token,studentId,examId) =>{
    const response = await axios.get(`${apiUrl}/mark/getMark/${studentId}/${examId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const getMarks = async (token,page) =>{
    const response = await axios.get(`${apiUrl}/mark/getMarks?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const addMark = async (token,data) =>{
    const response = await axios.post(`${apiUrl}/mark/addMark`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}