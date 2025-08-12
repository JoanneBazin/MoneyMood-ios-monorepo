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

export const PrivateAppLayout = () => {
  const { isLoading: isLoadingBudget, isError: isErrorBudget } =
    useCurrentBudgetQuery();
  const { isLoading: isLoadingCharges, isError: isErrorCharges } =
    useFixedChargesQuery();
  const { isLoading: isLoadingIncomes, isError: isErrorIncomes } =
    useFixedIncomesQuery();
  const isLoading = isLoadingBudget || isLoadingCharges || isLoadingIncomes;
  const isError = isErrorBudget || isErrorCharges || isErrorIncomes;
  const { isOffline } = useOfflineStatus();

  const isHydrated = useBudgetStore((s) => s.isBudgetHydrated);

  if (isLoading || !isHydrated) {
    return <LoaderScreen />;
  }

  return (
    <div className="app-container">
      <Header />
      <main>
        <Banner />
        {isOffline && <OfflineBanner />}
        {isError && (
          <ErrorMessage message="Certains contenus n'ont pas pu être chargés" />
        )}
        <Outlet />
      </main>
      <Bottombar />
    </div>
  );
};
