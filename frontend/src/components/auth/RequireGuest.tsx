import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

export const RequireGuest = () => {
  const user = useUserStore((s) => s.user);

  return user ? <Navigate to="/app" replace /> : <Outlet />;
};
