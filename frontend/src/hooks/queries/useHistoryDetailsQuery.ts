import { getBudgetById } from "@/lib/api";
import { MonthlyBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useHistoryDetailsQuery = (id: string | undefined) => {
  const query = useQuery<MonthlyBudget>({
    queryKey: ["history", id],
    queryFn: () => getBudgetById(id!),
    enabled: !!id,
  });

  return query;
};
