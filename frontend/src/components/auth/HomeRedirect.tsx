import { Home } from "@/pages/public/Home";
import { useAppStore } from "@/stores/appStore";
import { Navigate } from "react-router-dom";

export const HomeRedirect = () => {
  const user = useAppStore((s) => s.user);

  if (!user) return <Home />;

  return <Navigate to="/app" replace />;
};
