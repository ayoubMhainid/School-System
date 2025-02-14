import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppContextCom = ({ children }) => {
  const [user, setUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [widthOutlet, setWidthOutlet] = useState("");

  const value = {
    user,
    setUser,
    isMenuOpen,
    setIsMenuOpen,
    // widthOutlet,
    // setWidthOutlet,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextCom;
