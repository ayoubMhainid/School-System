import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getEventsPaginate = async (token, page) => {
  const response = await axios.get(
    `${apiUrl}/event/getEventsPaginate?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const deleteEvent = async (token,id) => {
  const response = await axios.delete(`${apiUrl}/event/deletEvent/${id}`,{
      headers :{
          Authorization : `Bearer ${token}`
      }
  })
  return response
}

export const createEvent = async (token,data) =>{
  const response = await axios.post(`${apiUrl}/event/createEvent`,data,{
      headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
      }
  });
  return response;
}