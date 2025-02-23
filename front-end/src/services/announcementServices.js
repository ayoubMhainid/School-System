import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAnnouncements = async (token,page) => {
    const response = await axios.get(`${apiUrl}/announcement/getAnnouncements?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const getAnnouncementsPaginate = async (token,page) => {
    const response = await axios.get(`${apiUrl}/announcement/getAnnouncementsPaginate?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const createAnnouncement = async (token, data) => {
    const response = await axios.post(`${apiUrl}/announcement/createAnnouncements`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteAnnouncement = async (token, announcement_id) => {
    const response = await axios.delete(`${apiUrl}/announcement/deleteAnnouncement/${announcement_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}