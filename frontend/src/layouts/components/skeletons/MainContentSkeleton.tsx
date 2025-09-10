import { useLocation } from "react-router-dom";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { HistorySkeleton } from "./HistorySkeleton";
import { CreateSkeleton } from "./CreateSkeleton";

export const MainContentSkeleton = () => {
  const location = useLocation();

  switch (location.pathname) {
    case "/app":
      return <DashboardSkeleton />;
    case "/app/history":
      return <HistorySkeleton />;
    case "/app/create":
      return <CreateSkeleton />;
    default:
      return <DashboardSkeleton />;
  }
};
