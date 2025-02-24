import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getSecrets = async (token,page) =>{
    const response = await axios.get(`${apiUrl}/secret/getSecrets?page=${page}`,{
        headers : {
            Authorization : `Bearer ${token}` 
        }
    });
    return response;
}

export const createSecret = async (token,data) =>{
    const response = await axios.post(`${apiUrl}/secret/createSecret`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const deleteSecret = async (token,id) =>{
    const response = await axios.delete(`${apiUrl}/secret/deleteSecret/${id}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}