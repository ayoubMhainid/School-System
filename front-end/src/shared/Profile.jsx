import { useState } from "react";
import { useAppContext } from "../context/AppContext";


export const Profile = () => {
  
    const [errorMessage,setErrorMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const { isMenuOpen } = useAppContext();

    const getAuthenticatedUserData_FUNCTION = async () =>{
      
    }
  return (
    !isMenuOpen && (
      <div className={`ml-6 mt-6 w-[85%]`}>
        <div className="w-[100%] px-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
          <br></br>
        </div>
        <div className="mt-4 px-2">
          {errorMessage && (
            <span className="text-red-300 text-xl font-semibold">
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    )
  );
};
