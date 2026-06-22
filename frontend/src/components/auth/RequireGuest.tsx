import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../ui";
import { ErrorState } from "@/layouts/components";
import { useSessionQuery } from "@/hooks/queries";

export const RequireGuest = () => {
  const { data: user, isPending, error } = useSessionQuery();

  if (isPending) {
    return <Loader type="layout" />;
  }

  if (error) {
    return <ErrorState />;
  }

  return user ? <Navigate to="/app" replace /> : <Outlet />;
};
