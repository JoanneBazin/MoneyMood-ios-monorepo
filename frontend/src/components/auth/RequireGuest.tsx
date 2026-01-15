import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "@/stores/appStore";

export const RequireGuest = () => {
  const user = useAppStore((s) => s.user);

  return user ? <Navigate to="/app" replace /> : <Outlet />;
};
