import { fetchFixedCharges } from "@/lib/api/fixedCharges";
import { useBudgetStore } from "@/stores/budgetStore";
import { BudgetEntry } from "@shared/schemas";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOfflineStatus } from "../useOfflineStatus";

export const useFixedChargesQuery = () => {
  const setFixedCharges = useBudgetStore((s) => s.setFixedCharges);
  const { isOnline } = useOfflineStatus();

  const query = useQuery<BudgetEntry[]>({
    queryKey: ["fixedCharges"],
    queryFn: fetchFixedCharges,
    retry: false,
    enabled: isOnline,
    refetchOnWindowFocus: isOnline,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (!isOnline) return;

    if (query.data) {
      setFixedCharges(query.data);
    }
  }, [query.data, setFixedCharges]);

  return query;
};
