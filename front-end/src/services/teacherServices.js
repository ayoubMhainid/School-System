import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createTeacher = async (token, data) => {
  const response = await axios.post(`${apiUrl}/teacher/createTeacher`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getTeachers = async (token, page) => {
  const response = await axios.get(
    `${apiUrl}/teacher/getTeachers?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAllTeacherOfStudent = async (token) => {
  const response = await axios.get(
    `${apiUrl}/teacher/getAllTeacherOfStudent`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getAllTeachers = async (token) => {
  const response = await axios.get(
    `${apiUrl}/teacher/getAllTeachers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const searchTeachersByUsername = async (token, username) => {
  const response = await axios.get(
    `${apiUrl}/teacher/searchTeachersByUsername/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getTeachersByClass = async (token, class_id) => {
  const response = await axios.get(
    `${apiUrl}/teacher/getTeachersByClass/${class_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteTeacher = async (token, teacher_id) => {
  const response = await axios.delete(
    `${apiUrl}/teacher/deleteTeacher/${teacher_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};


export const updateTeacherData = async (token,data) =>{
  const response = await axios.put(`${apiUrl}/teacher/updateTeacher`,data,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  });
  return response;
}