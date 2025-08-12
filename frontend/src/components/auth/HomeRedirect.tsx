import { Home } from "@/pages/public/Home";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";

export const HomeRedirect = () => {
  const user = useUserStore((s) => s.user);

  if (!user) return <Home />;

  return <Navigate to="/app" replace />;
};
