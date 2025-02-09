import React from "react";
import { useAppContext } from "../context/AppContext";

export const Home = () => {
  const { user, isMenuOpen } = useAppContext();

  return (
    <div className={isMenuOpen ? "hidden" : ""}>
      this home for {user.role === "student" ? "student" : "teacher"}
    </div>
  );
};
