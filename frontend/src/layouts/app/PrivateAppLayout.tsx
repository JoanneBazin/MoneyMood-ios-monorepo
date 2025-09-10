import {
  useCurrentBudgetQuery,
  useFixedChargesQuery,
  useFixedIncomesQuery,
} from "@/hooks/queries";
import { useBudgetStore } from "@/stores/budgetStore";
import { Outlet } from "react-router-dom";
import { Bottombar, Header, LoaderScreen, OfflineBanner } from "../components";
import { Banner } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { MainContentSkeleton } from "../components/skeletons";

export const PrivateAppLayout = () => {
  const { isLoading, isError } = useCurrentBudgetQuery();
  const isHydrated = useBudgetStore((s) => s.isBudgetHydrated);
  const { isOffline } = useOfflineStatus();
  const isContentReady = !isLoading && isHydrated;

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
        {isContentReady ? <Outlet /> : <MainContentSkeleton />}
      </main>
      <Bottombar />
    </div>
  );
};
