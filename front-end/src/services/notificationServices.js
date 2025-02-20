import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getNotification = async (token,page) =>{
    const response  = await axios.get(`${apiUrl}/notification/getNotifications?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const createNotification = async (token,data) =>{
    const response = await axios.post(`${apiUrl}/notification/createNotification`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const updateNotificationStatus = async (token,id) =>{
    const response = await axios.put(`${apiUrl}/notification/makeNotificationSeen/${id}`,null,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const deleteNotification = async (token,id) =>{
    const response = await axios.delete(`${apiUrl}/notification/deleteNotification/${id}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}