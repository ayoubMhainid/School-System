import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getSubjects = async (token,page) => {
  const response = await axios.get(
    `${apiUrl}/subject/getSubjects?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const getallSubject = async (token) => {
  const response = await axios.get(
    `${apiUrl}/subject/getSubjects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const deleteSubject = async (token,id) =>{
  const response = await axios.delete(`${apiUrl}/subject/deleteSubject/${id}`,{
      headers : {
          Authorization : `Bearer ${token}`
      }
  });
  return response;
}
export const UpdateSubject = async (token,data) =>{
  const response = await axios.put(`${apiUrl}/subject/updateSubject`,data,{
      headers : {
          Authorization : `Bearer ${token}`
      }
  });
  return response;
}
export const AddSubjects = async (token,data) =>{
  const response = await axios.post(`${apiUrl}/subject/createSubject`,data,{
      headers : {
          Authorization : `Bearer ${token}`
      }
  });
  return response;
}