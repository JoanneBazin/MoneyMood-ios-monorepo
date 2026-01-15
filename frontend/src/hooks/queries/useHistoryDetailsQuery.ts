import { getBudgetById } from "@/lib/api/monthlyBudgets";
import { MonthlyBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useHistoryDetailsQuery = (id: string) => {
  const query = useQuery<MonthlyBudget>({
    queryKey: ["history", id],
    queryFn: () => getBudgetById(id),
  });

  return query;
};
