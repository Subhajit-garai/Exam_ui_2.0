import { useAppSelector } from "@repo/store/hook";
import { Navigate, Outlet ,useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const {islogin} = useAppSelector((state) => state.user);
  const location = useLocation();
  
  return islogin ? (localStorage.setItem("lastPage", location.pathname) ,<Outlet />) :(localStorage.setItem("lastPage", location.pathname) , <Navigate to="/login" replace />) ;
};