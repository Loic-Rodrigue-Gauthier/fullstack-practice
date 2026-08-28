import { STORAGE_KEYS } from "../constants/storage";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoutes() {
  const user = localStorage.getItem(STORAGE_KEYS.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
