import { useSessionQuery } from "@/hooks/queries";
import { Home } from "@/pages/public/Home";
import { Navigate } from "react-router-dom";
import { Loader } from "../ui";
import { ErrorState } from "@/layouts/components";

export const HomeRedirect = () => {
  const { data: user, isPending, error } = useSessionQuery();

  if (isPending) {
    return <Loader type="layout" />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!user) return <Home />;

  return <Navigate to="/app" replace />;
};
