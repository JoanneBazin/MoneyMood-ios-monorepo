import { useSessionQuery } from "@/hooks/queries";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../ui";
import { ErrorState } from "@/layouts/components";

export const RequireAuth = () => {
  const { data: user, isPending, error } = useSessionQuery();

  if (isPending) {
    return <Loader type="layout" />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};
