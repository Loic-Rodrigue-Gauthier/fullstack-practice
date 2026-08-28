import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import GuestRoutes from "./GuestRoutes";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<GuestRoutes />}>
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}
