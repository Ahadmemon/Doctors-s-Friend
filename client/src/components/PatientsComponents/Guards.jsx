import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function ProtectedRoute() {
  const { user, profile } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (!profile) return <Navigate to="/create-profile" replace />;
  return <Outlet />;
}

export function ProfileRoute() {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function GuestRoute() {
  const { user, profile } = useApp();
  if (user && !profile) return <Navigate to="/create-profile" replace />;
  if (user && profile) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
