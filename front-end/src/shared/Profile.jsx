import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getAuthenticatedUserData } from "../services/userServices";
import { errors } from "../constants/Errors";
import { LinearProgress } from "@mui/material";
import { Input } from "../components/UI/Input";
import { Label } from "../components/UI/Label";
import { getClasses } from "../services/classServices";
import { Select } from "../components/UI/Select";
import { Button } from "../components/UI/Button";


export const Profile = () => {
  
    const [errorMessage,setErrorMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const { isMenuOpen } = useAppContext();
    const [userRole,setUserRole] = useState('');
    const [userData,setUserData] = useState(null);
    const [classes,setClasses] = useState(false);

    const getAuthenticatedUserData_FUNCTION = async () =>{
      setLoading(true);
      var response = await getAuthenticatedUserData(localStorage.getItem('token'));
      setLoading(false);
      console.log(response);
      
      response.status === 200 ? 
      (setUserRole(response.data.role), setUserData(response.data.userData) )
      : setErrorMessage(errors.tryAgain)
      return response.data.userRole;
    }

    const getClasses_FUNCTION = async () =>{
      let response = await getClasses(localStorage.getItem('token'));
      response.data.classes ? setClasses(response.data.classes) : setErrorMessage(errors.tryAgain) 
      console.log(response);
      
    }

    useEffect(() =>{
      getAuthenticatedUserData_FUNCTION();
      getAuthenticatedUserData() && getClasses_FUNCTION();
    },[])
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
          {
            loading && <LinearProgress />
          }
          {
            !loading && userData?
              <>
                <div className="flex items-center gap-4">
                  <div>
                    <img src={userData.profile_picture} className="w-20 h-20 rounded-full" alt="Profile" />
                  </div>
                  <div className="flex justify-start flex-col">
                    <span className="text-2xl font-semibold">{userData.full_name}</span>
                    <span className="text-gray-400">{userData.phone}</span>
                    <span className="text-blue-400">{userData.username}</span>
                  </div>
                </div>
                <br></br>
                <hr></hr>
                <div className="mt-4">
                  <table className="w-[100%]">
                    <tr>
                      <td className="px-3 py-2">
                        <Label text={'Full name'} />
                      </td>
                      <td className="px-3 py-2">
                        <Label text={'Phone'} />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3">
                        <Input type={'text'} value={userData.full_name} />
                      </td>
                      <td className="px-3">
                        <Input type={'text'} value={userData.phone} />
                      </td>
                    </tr>


                    <tr>
                      <td className="px-3 py-2">
                        <Label text={'Username'} />
                      </td>
                      <td className="px-3 py-2">
                        <Label text={'Adress'} />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3">
                        <Input type={'text'} value={userData.username} />
                      </td>
                      <td className="px-3">
                        <Input type={'text'} value={userData.address} />
                      </td>
                    </tr>


                    <tr>
                      <td className="px-3 py-2">
                        <Label text={'Email'} />
                      </td>
                      <td className="px-3 py-2">
                        <Label text={'Specialisation'} />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3">
                        <Input type={'text'} value={userData.user.email} />
                      </td>
                      <td className="px-3">
                        <Input type={'text'} value={userData.specialization} />
                      </td>
                    </tr>

                    <tr>
                      <td className="px-3 py-2">
                        <Label text={'Gender'} />
                      </td>
                      <td className="px-3 py-2">
                        <Label text={'Date Of birth'} />
                      </td>
                    </tr>


                    <tr>
                      <td className="px-3">
                        <div className="flex justify-start items-center gap-10">
                          <div className="flex items-center">
                            <Input type={'radio'} width={'20%'}/><Label text={'Male'} />
                          </div>
                          <div className="flex items-center">
                            <Input type={'radio'} width={'20%'}/><Label text={'Female'} />
                          </div>
                        </div>
                      </td>
                      <td className="px-3">
                        <Input type={'date'} value={userData.date_of_birth} />
                      </td>
                    </tr>


                    <tr>
                      <td className="px-3 py-2">
                        <Label text={`Class (${userData.class.class_name})`} />
                      </td>
                      <td className="px-3 py-2">
                        <Label text={'Secret Key'} />
                      </td>
                    </tr>


                    <tr>
                      <td className="px-3">
                        <Select options={classes} ky={'class_name'} value={'id'} width={'100%'} bg={'black'} title={'Your class'}/>
                      </td>
                      <td className="px-3">
                        <Input type={'text'} placholder={'Enter the secret here'} />
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="flex justify-end mt-2 px-3 gap-2">
                  <Button text={'Cancel'} width={'20%'} bg={'bg-gray-700'}/>
                  <Button text={'Save'} width={'20%'} bg={'bg-green-700'}/>
                </div>
              </>
            :null
          }
        </div>
      </div>
    )
  );
};
