import { CircularProgress } from "@mui/material";
import React from "react";
export const Button = ({ type, loading, onClick, text, bg, color, width }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color ? color : "text-white"} ${bg ? bg : "bg-blue-600"} ${
        width ? `w-[${width}]` : "w-[100%]"
      } px-3 cursor-pointer ${
        loading ? "cursor-no-drop" : null
      } font-semibold py-1 rounded-md h-9 flex items-center justify-center text-md`}
      disabled={loading}
    >
      {loading ? <CircularProgress size={"22px"} color="white" /> : text}
    </button>
  );
};
