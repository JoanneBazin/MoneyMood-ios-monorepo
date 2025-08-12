import { useUserStore } from "@/stores/userStore";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const user = useUserStore((s) => s.user);

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};
