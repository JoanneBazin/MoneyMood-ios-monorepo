import { fetchCurrentBudget } from "@/lib/api/monthlyBudgets";
import { hydrateBudgetStore } from "@/lib/hydrateBudgetStore";
import { useBudgetStore } from "@/stores/budgetStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOfflineStatus } from "../useOfflineStatus";
import { MonthlyBudget } from "@/types";

export const useCurrentBudgetQuery = () => {
  const { isOnline } = useOfflineStatus();
  const query = useQuery<MonthlyBudget | null>({
    queryKey: ["currentBudget"],
    queryFn: fetchCurrentBudget,
    enabled: isOnline,
    refetchOnWindowFocus: isOnline,
  });

  useEffect(() => {
    if (!isOnline) return;

    if (query.isFetched) {
      const { setIsBudgetHydrated } = useBudgetStore.getState();
      if (query.data) {
        hydrateBudgetStore(query.data);
      }
      setIsBudgetHydrated(true);
    }
  }, [query.data]);

  return query;
};
