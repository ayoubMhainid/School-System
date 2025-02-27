import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAttendance = async (token) =>{
    const response = await axios.get(`${apiUrl}/attendanceStud/getAttendance`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response
}

export const getAttendanceByClass = async (token, class_id,page) => {
    const response = await axios.get(`${apiUrl}/attendanceStud/getAttendanceByClass/${class_id}?page=${page}`,{
        headers :{	
            Authorization : `Bearer ${token}`
        }
    })
    return response
}

export const addAttendance = async (token,data) => {
    const response = await axios.post(`${apiUrl}/attendanceStud/createAttendance/`,data,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response 
}

export const getNbHoursOfAbsentStudents = async (token,class_id) => {
    const response = await axios.get(`${apiUrl}/attendanceStud/getNbHoursOfAbsentStudents/${class_id}`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response 
}

export const deleteAttendance = async (token,id) => {
    const response = await axios.delete(`${apiUrl}/attendanceStud/deleteAttendance/${id}`,{
        headers :{
            Authorization : `Bearer ${token}`
        }
    })
    return response 
}