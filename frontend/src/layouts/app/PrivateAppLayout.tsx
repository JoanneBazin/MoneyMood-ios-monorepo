import {
  useCurrentBudgetQuery,
  useFixedChargesQuery,
  useFixedIncomesQuery,
} from "@/hooks/queries";
import { Outlet } from "react-router-dom";
import { Bottombar, Header, OfflineBanner } from "../components";
import { Banner } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { MainContentSkeleton } from "../components/skeletons";

export const PrivateAppLayout = () => {
  const { isLoading, isError } = useCurrentBudgetQuery();
  const { isOffline } = useOfflineStatus();

  useFixedChargesQuery();
  useFixedIncomesQuery();

  return (
    <div className="app-container">
      <Header />
      <main>
        <Banner />
        {isOffline && <OfflineBanner />}
        {isError && (
          <ErrorMessage message="Certains contenus n'ont pas pu être chargés" />
        )}
        {isLoading ? <MainContentSkeleton /> : <Outlet />}
      </main>
      <Bottombar />
    </div>
  );
};
