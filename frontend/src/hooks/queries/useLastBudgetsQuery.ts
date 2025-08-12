import { fetchLastBudgets } from "@/lib/api/monthlyBudgets";
import { LastMonthlyBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useLastBudgetsQuery = () => {
  const query = useQuery<LastMonthlyBudget[]>({
    queryKey: ["history"],
    queryFn: fetchLastBudgets,
    retry: false,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  return query;
};
