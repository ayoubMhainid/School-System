import React from "react";
import { useAppContext } from "../../context/AppContext";

export const Dashboard = () => {
  const { user, isMenuOpen } = useAppContext();

  return (
    <div
      className={isMenuOpen ? "hidden" : ""}
    >{`this dashboard for ${user.role}`}</div>
  );
};
