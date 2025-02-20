import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/userServices';
import img from '../../../public/imgProfile.png'
import { getClasses,  getClassesByTeacher } from '../../services/classServices';
import { useParams } from 'react-router-dom';

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
        const response = await getClasses(localStorage.getItem("token"));
        response.status === 200
          ? response.data.classes.length
            ? setClasses(response.data.classes)
            : setErrorMessage(errors.notFound)
          : setErrorMessage(errors.tryAgain);
      };
      const getClassesByTeacher_FUNCTION = async ($id) => {
        const response = await getClassesByTeacher(localStorage.getItem("token"),$id);        
        response.data 
          ? response.data.classes.length
            ? setClassesByTeacher(response.data.classes)
            : null
          : setErrorMessage(errors.tryAgain);
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
    <div className={`ml-6 mt-6 w-[81%]`}>
        <div className="w-[100%] px-2">
            <h1 className="text-3xl font-semibold">Detail User</h1>
        </div>
        <div className="mt-6 flex items-center gap-4">
            <div>
                <img src={img} className='w-20 h-20 rounded-full' />
            </div>
            <div className='flex justify-start flex-col'>
                <span className='text-2xl font-semibold'>{userData.full_name}</span>
                <span className='text-gray-400'>{userData.phone}</span>
                <span className='text-blue-400'>{userData.username}</span>
                {userData.user ? (
                <div>
                    <span className='text-red-500'>{userData.user.role}</span> 
                </div>
            ):null}
            </div>
        </div>
        <hr className='mt-10'/>
        <div className='w-[100%] px-2 py-3 gap mt-4 space-y-3'>
            
            <div className='w-[100%] px-2 py-3 gap mt-4 space-y-3'>
                
                    {userData.gender ? (
                        <div>
                        gender : <span className='text-gray-400'>{userData.gender}</span> 
                        </div>
                    ):null}
                    {userData.date_of_birth ? (
                        <div>
                            date of birth : <span className='text-gray-400'>{userData.date_of_birth}</span> 
                        </div>
                    ):null}
                    {userData.specialization ? (
                        <div>
                            specialization : <span className='text-gray-400'>{userData.specialization}</span> 
                        </div>
                    ):null}
                    {classesByTeacher.length > 0 ? (
                        <div>
                            <span>Classes:</span>
                            <ul>
                            {classesByTeacher.map((c) => (
                                <li key={c.id} className="text-gray-400">{c.class_name}</li>
                            ))}
                            </ul>
                        </div>
                        ) : null}

                    {classes && classes.length && userData.class_id ? (
                        <div>
                            Classe : <span className='text-gray-400'>
                            {classes.find((c) => c.id === userData.class_id)?.class_name}
                            </span> 
                        </div>
                    ):null}
                    {userData.address ? (
                        <div>
                        address : <span className='text-gray-400'>{userData.address}</span> 
                        </div>
                    ):null}
                </div>
        </div>
    </div>
  )
}

export default Profile