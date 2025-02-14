import React, { useState } from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export const UpdateUser = ({
  handleSubmit,
  handleUpdateUserChange,
  setOpenAjoute,
  loading,
}) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Update User</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to update user
          </p>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <Label text={"Email"} />
          <Input
            type="text"
            name={"email"}
            onChange={handleUpdateUserChange}
            placholder="ex: bijo@gmail.com"
            border="black"
            text="black"
          />
          <Label text={"Password"} />
          <Input
            type="password"
            name={"password"}
            onChange={handleUpdateUserChange}
            placholder="●●●●●●●●"
            border="black"
            text="black"
          />

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenAjoute(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Update User"
              loading={loading}
              bg="bg-blue-600"
              color="white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
