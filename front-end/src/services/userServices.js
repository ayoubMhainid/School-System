import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const updateUserCredentials = async (token,data) =>{
    const response = await axios.put(`${apiUrl}/user/updateUserData/${data.id}`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}


export const deleteUser = async (token,id) =>{
    const response = await axios.delete(`${apiUrl}/user/deleteUser/${id}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const getUserById = async (token, id) => {
    const response = await axios.get(
      `${apiUrl}/user/getUserById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };


export const getAuthenticatedUserData = async (token) =>{
  const response = await axios.get(`${apiUrl}/user/getAuthUserData`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}