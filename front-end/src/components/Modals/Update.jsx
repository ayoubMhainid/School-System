import { useState } from "react";
import React from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { updateUserCredentials } from "../../services/userServices";
import { errors } from "../../constants/Errors";
import { Notification } from "../UI/Notification";
import { Select } from "../UI/Select";


export const Update = ({ modal,setModal }) => {
  console.log(modal);
  

  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState(null);
  const [userCredentialsForm,setUserCredentialsForm] = useState({
    id : modal?.data?.user?.id,
    email : '',
    password : '',
  });  

  const [subjectData,setSubjectData] = useState({
    id:modal?.data?.id,
    subjectName:modal?.data?.name,
    teacherName:modal?.data?.teacher?.full_name,
    className:modal?.data?.class?.class_name,
    teacherId:modal?.data?.teacher_id,
    classId:modal?.data?.class_id,
  })

  const handleChangeUserCredentials = (e) =>{
    const {name,value} = e.target;
    setUserCredentialsForm((prevData) =>({
      ...prevData,
      [name] : value,
    }));
  }

  const handleChangeSubject = (e) =>{
    const {name,value} = e.target;
    setSubjectData((prevData) =>({
      ...prevData,
      [name] : value,
    }));
  }

  const update_FUNCTION = async (e) =>{
    e.preventDefault();
  
    try{
      setNotification(null);
      setLoading(true);
      if(modal.toUpdateOrDelete === 'User'){
        const response = await updateUserCredentials(localStorage.getItem('token'),userCredentialsForm);
        setLoading(false);

        response.status === 200 ? response.data.message ? (setNotification({type:'success',message:response.data.message}),
        setTimeout(() => {
          setModal({type:''})
        }, 3000), modal.data.user.email = userCredentialsForm.email)

        : setNotification({type:"error",message : errors.tryAgain}) : setNotification({type : 'error',message : errors.notFound})

      }else if(modal.toUpdateOrDelete === 'Subject'){
        // function to update the subject data
      }
    }catch(error){
      setLoading(false);
      error.response ? setNotification({type:'error',message:error.response.data.message}) : setNotification({type:"error",message:errors.tryAgain})
    }
    
  }

  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Update {modal.toUpdateOrDelete} Credentials</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to update {modal.toUpdateOrDelete} DATA
          </p>
        </div>
        <form className="mt-6" onSubmit={update_FUNCTION}>
            {
              modal.toUpdateOrDelete === 'User' && (
                <>
                  <Label text={"Email"} />
                  <Input
                    type="text"
                    name={"email"}
                    value={userCredentialsForm.email}
                    onChange={handleChangeUserCredentials}
                    placholder={modal.data.user.email}
                    border="black"
                    text="black"
                  />
                  <Label text={"Password"} />
                  <Input
                    type="password"
                    name={"password"}
                    value={userCredentialsForm.password}
                    onChange={handleChangeUserCredentials}
                    placholder="*********"
                    border="black"
                    text="black"
                  />
                </>
              ) 
            }
            {
              modal.toUpdateOrDelete === 'Subject' && (
                <>
                  <Label text={"Subject name"} />
                  <Input
                    type="text"
                    name="subject_name"
                    onChange={handleChangeSubject}
                    placholder={subjectData.subjectName}
                    border="black"
                    text="black"
                  />

                  <Label text={`Teacher (${subjectData.teacherName})`} /><br></br>
                  <Select title={'Select teacher'} bg={'bg-white'} width={'100%'} border={'border-black'} onchange={handleChangeSubject}/>
                  <br></br>
                  <Label text={`Class (${subjectData.className})`} /><br></br>
                  <Select title={'Select Class'} bg={'bg-white'} width={'100%'} border={'border-black'} onchange={handleChangeSubject}/>
                </>
              )
            }
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setModal({type:''})}
              bg="bg-gray-200"
              color="text-gray-900"
            />
            <Button
              type="submit"
              text="Save"
              loading={loading}
              bg="bg-blue-600"
            />
          </div>
        </form>
        {
          notification && <Notification type={notification.type} message={notification.message} />
        }
      </div>
    </div>
  );
};


  