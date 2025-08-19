import { fetchLastBudgets } from "@/lib/api/monthlyBudgets";
import { LastMonthlyBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useLastBudgetsQuery = () => {
  const query = useQuery<LastMonthlyBudget[]>({
    queryKey: ["history"],
    queryFn: fetchLastBudgets,
  });

  return query;
};
