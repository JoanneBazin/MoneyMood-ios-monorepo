import { fetchFixedIncomes } from "@/lib/api/fixedIncomes";
import { useBudgetStore } from "@/stores/budgetStore";
import { BudgetEntry } from "@shared/schemas";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOfflineStatus } from "../useOfflineStatus";

export const useFixedIncomesQuery = () => {
  const setFixedIncomes = useBudgetStore((s) => s.setFixedIncomes);
  const { isOnline } = useOfflineStatus();

  const query = useQuery<BudgetEntry[]>({
    queryKey: ["fixedIncomes"],
    queryFn: fetchFixedIncomes,
    retry: false,
    enabled: isOnline,
    refetchOnWindowFocus: isOnline,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (!isOnline) return;

    if (query.data) {
      setFixedIncomes(query.data);
    }
  }, [query.data, setFixedIncomes]);

  return query;
};
