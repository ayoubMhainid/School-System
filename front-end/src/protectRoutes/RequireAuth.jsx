import { useAppContext } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const { user } = useAppContext();
  const location = useLocation();
  console.log("hh", user);
  return user.role ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/sign_in" />
  );
};
