import { useAppStore } from "@/stores/appStore";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const user = useAppStore((s) => s.user);

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};
