import React, { useState } from "react";
import { dataSideBar } from "../constants/Links";
import { Outlet, useNavigate } from "react-router-dom";
import { SingleLink } from "../components/UI/SingleLink";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { CircularProgress } from "@mui/material";
import { useAppContext } from "../context/AppContext";

export const Layout = ({ loading }) => {
  const navigate = useNavigate();
  const { user, isMenuOpen, setIsMenuOpen } = useAppContext();

  const newdataSideBar = dataSideBar.filter(
    (element) => element.ROLE == user.role
  );

  return (
    <div
      onClick={() => {
        setIsMenuOpen(false);
      }}
      className="w-[100vw] h-[100vh] flex flex-col sm:flex-row"
    >
      <div className="w-full h-[45px] relative flex items-center sm:hidden shadow-[0_0_1px_rgba(0,0,0,0.5)] ">
        <Bars3Icon
          className={`w-[25px] h-[25px] ml-3 ${isMenuOpen && "hidden"}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(true);
          }}
        />
      </div>
      {newdataSideBar && newdataSideBar.length > 0 && (
        <div
          className={`z-40 bg-dark [#011a41]) font-[500] font-[Poppins,sans-serif] w-[80%] 2xl:w-[15%] md:w-[300px] h-full shadow-[0_0_15px_rgba(0,0,0,0.5)] flex flex-col pl-1 ${
            user !== "admin" && "pt-8"
          } absolute sm:translate-x-0 duration-500 ${
            !isMenuOpen && "-translate-x-full"
          } sm:static`}
        >
          {newdataSideBar.map((item) => {
            return (
              <div
                className="m-3"
                key={item.TEXT}
                onClick={() => {
                  navigate(item.LINK);
                }}
              >
                <SingleLink link={item.LINK} svg={item.SVG} text={item.TEXT} />
              </div>
            );
          })}
          <div
            className={`flex justify-baseline gap-1.5 items-center cursor-pointer hover:text-blue-400 duration-200 rounded-lg m-3`}
          >
            {!loading ? (
              <>
                <div>
                  {
                    <ArrowRightOnRectangleIcon
                      className="w-6 h-6"
                      strokeWidth="1"
                    />
                  }
                </div>
                <div>
                  <span className="text-lg font-normal">{"Logout"}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <CircularProgress size={"40px"} className="text-blue-700" />
              </div>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};
