import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/userServices';
import imgProfile from '../../../public/imgProfile.png';  
import { getClasses,  getClassesByTeacher } from '../../services/classServices';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

function Profile() {
    const [userData , setUserData] = useState([]);
    const [classes, setClasses] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [classesByTeacher , setClassesByTeacher] = useState([]);
    const {id} = useParams()    
    const getUserData = async ($id) =>{
        setLoading(true);
        const response = await getUserById(localStorage.getItem("token"),$id)
        if(response){
            setLoading(false)
            setUserData(response.data.user);
        }   
    }
    const getClasses_FUNCTION = async () => {
        setLoading(true);
        const response = await getClasses(localStorage.getItem("token"));
        response.status === 200
          ? response.data.classes.length
            ? setClasses(response.data.classes)
            : setErrorMessage(errors.notFound)
          : setErrorMessage(errors.tryAgain);
          
      };
      const getClassesByTeacher_FUNCTION = async ($id) => {
        setLoading(true);
        const response = await getClassesByTeacher(localStorage.getItem("token"),$id);        
        response.data 
          ? response.data.classes.length
            ? setClassesByTeacher(response.data.classes)
            : null
          : setErrorMessage(errors.tryAgain);
          setLoading(false);
      };
    useEffect(() => {
        getUserData(id);
        getClasses_FUNCTION();
      }, []);
      useEffect(() => {
        if (userData?.specialization) {    
            getClassesByTeacher_FUNCTION(userData.id);
        }
    }, [userData]); 
    return (
        <div className="ml-6 mt-6 w-[81%]">
          <div className="w-full px-2">
            <h1 className="text-3xl font-semibold">Detail User</h1>
          </div>
      
          {loading && <LinearProgress />}
      
          {!loading && (
            <>
              <div className="mt-6 flex items-center gap-4">
                <div>
                  <img src={userData.profile_picture} className="w-20 h-20 rounded-full" alt="Profile" />
                </div>
                <div className="flex justify-start flex-col">
                  <span className="text-2xl font-semibold">{userData.full_name}</span>
                  <span className="text-gray-400">{userData.phone}</span>
                  <span className="text-blue-400">{userData.username}</span>
                  {userData?.user && (
                    <div>
                      <span className="text-green-500 font-semibold">{userData.user.role} | {userData.user.id}</span>
                    </div>
                  )}
                </div>
              </div>
      
              <hr className="mt-10" />
      
              <div className="w-full px-2 py-3 gap mt-4 space-y-3">
                {userData.gender && (
                  <div className="front-semibold text-xl">
                    Gender: <span className="text-gray-400">{userData.gender}</span>
                  </div>
                )}
      
                {userData.date_of_birth && (
                  <div className="front-semibold text-xl">
                    Date of Birth: <span className="text-gray-400">{userData.date_of_birth}</span>
                  </div>
                )}
      
                {userData.specialization && (
                  <div className="front-semibold text-xl">
                    Specialization: <span className="text-gray-400">{userData.specialization}</span>
                  </div>
                )}
      
                {classesByTeacher.length > 0 && (
                  <div className="front-semibold text-xl">
                    <span>Classes:</span>
                    <ul>
                      {classesByTeacher.map((c) => (
                        <li key={c.id} className="text-gray-400">{c.class_name}</li>
                      ))}
                    </ul>
                  </div>
                )}
      
                {classes && classes.length && userData.class_id && (
                  <div className="front-semibold text-xl">
                    Class: <span className="text-gray-400">
                      {classes.find((c) => c.id === userData.class_id)?.class_name}
                    </span>
                  </div>
                )}
      
                {userData.address && (
                  <div className="front-semibold text-xl">
                    Address: <span className="text-gray-400">{userData.address}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
      
}

export default Profile