import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../../context/AppContext";
import { Outlet } from "react-router-dom";

export const PersisLogin = () => {
  const { setUser } = useAppContext();
  const token = localStorage.getItem("token");
  const _token = jwtDecode(token);
  const role = _token.role;
  useEffect(() => {
    setUser({ role, token });
  }, []);

  return <Outlet />;
};
