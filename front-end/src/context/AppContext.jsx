import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextCom = ({ children }) => {
  const [user, setUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const _user = localStorage.getItem("user");
    setUser(JSON.parse(_user));
  }, []);

  const value = {
    user,
    setUser,
    isMenuOpen,
    setIsMenuOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextCom;
