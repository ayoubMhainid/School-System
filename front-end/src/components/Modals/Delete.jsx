import React, { useState } from "react";
import { Button } from "../UI/Button";
import { deleteUser } from "../../services/userServices";
import { errors } from "../../constants/Errors";
import { Notification } from "../UI/Notification";

export const Delete = ({ modal,setModal }) => {
  const [loading,setLoading] = useState(false);
  const [notificaton,setNotification] = useState(null);

  const deleteUser_FUNCTION = async () =>{
    setNotification(null);
    setLoading(false);
    const response = await deleteUser(localStorage.getItem('token'),modal.data.user.id);
    response.status === 200 ? response.data.message ? 
    (setNotification({type:"success",message:response.data.message}),setTimeout(() => {setModal({type:''})},3000))
     : setNotification({type:'error',message:errors.tryAgain}) : setNotification({type:'error',message: errors.notFound});
  }

  const delete_FUNCTION = async (e) =>{
    e.preventDefault();
    modal.toUpdateOrDelete === 'User' && deleteUser_FUNCTION();
  }

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white px-10 py-6 rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Are you sure you want to delete this {modal.toUpdateOrDelete}
          </h1>
        </div>

        <div className="mt-4">
          <p className="text-gray-700">
          {modal.data.username ? (
            <>
              If you delete <span className="font-semibold text-lg">{modal.data.username}</span>, it cannot be recovered. Are you sure you want to proceed?
            </>
          ) : (
            'Are you sure you want to delete it!'
          )}

          </p>
        </div>
        <form className="flex justify-end gap-3 mt-6 w-[40%] float-end" onSubmit={delete_FUNCTION}>
          <Button
            type={"button"}
            text={"Cancel"}
            onClick={() => setModal({type:''})}
            bg="bg-gray-200"
            color="text-gray-900"
            width={"25%"}
          />
          <Button
            type={"submit"}
            text={"Delete"}
            loading={loading}
            bg={"bg-red-600 px-3"}
            color={"white"}
            width={"25%"}
          />
        </form>
        {
          notificaton && <Notification type={notificaton.type} message={notificaton.message} />
        }
      </div>
    </div>
  );
};
