import React from "react";
import { Button } from "../UI/Button";

export const Delete = ({ modal,setModal }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white px-10 py-6 rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Are you sure you want to delete this {modal.toUpdateOrDelete}
          </h1>
        </div>
        <div className="mt-4">
          {/* <p className="text-gray-700">
            {typeofUser
              ? `If you delete this ${typeofUser}, it cannot be recovered. Are you sure
            you want to proceed?`
              : contenuMessage}
          </p> */}
        </div>
        <div className="flex justify-end gap-3 mt-6 w-[40%] float-end">
          <Button
            type={"button"}
            text={"Cancel"}
            onClick={() => setModal({type:''})}
            bg="bg-gray-200"
            color="text-gray-900"
            width={"25%"}
          />
          <Button
            type={"button"}
            text={"Delete"}
            // loading={loading}
            bg={"bg-red-600 px-3"}
            color={"white"}
            width={"25%"}
          />
        </div>
      </div>
    </div>
  );
};
