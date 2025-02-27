import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAttendance = async (token) =>{
    const response = await axios.get(`${apiUrl}/attendance/getAttendance`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response
}


export const addAttendance = async (token,data) => {
    const response = await axios.post(`${apiUrl}/attendance/createAttendance/`,data,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response 
}

export const deleteAttendance = async (token,id) => {
    const response = await axios.delete(`${apiUrl}/attendance/deleteAttendance/${id}`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response 
}