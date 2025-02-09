import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextCom = ({ children }) => {
  const [user, setUser] = useState({
    role: "",
    token: "",
  });

  useEffect(() => {
    const _user = localStorage.getItem("user");
    setUser(_user);
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextCom;
