import { CurrentBudgetLayout, EmptyBudgetActions } from "@/components/features";
import { ErrorMessage, OfflineEmptyState } from "@/components/ui";
import { useCurrentBudgetQuery } from "@/hooks/queries";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

export const Dashboard = () => {
  const {
    data: currentBudget,
    isError,
    dataUpdatedAt,
  } = useCurrentBudgetQuery();
  const { isOffline } = useOfflineStatus();
  const isOfflineNoCache = isOffline && !currentBudget && dataUpdatedAt === 0;

  if (isOfflineNoCache) return <OfflineEmptyState />;
  if (isError) return <ErrorMessage />;
  if (!currentBudget) return <EmptyBudgetActions />;

  return <CurrentBudgetLayout budget={currentBudget} />;
};
