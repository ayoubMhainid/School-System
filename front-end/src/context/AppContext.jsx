import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextCom = ({ children }) => {
  const [user, setUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [addUserRole, setAddUserRole] = useState("student");

  const value = {
    user,
    setUser,
    isMenuOpen,
    setIsMenuOpen,
    // addUserRole,
    // setAddUserRole,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextCom;
