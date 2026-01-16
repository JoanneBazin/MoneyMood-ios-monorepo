import { fetchAllSpecialBudgets } from "@/lib/api";
import { SpecialBudgetItem } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSpecialBudgetsQuery = () => {
  const query = useQuery<SpecialBudgetItem[]>({
    queryKey: ["projects"],
    queryFn: fetchAllSpecialBudgets,
  });

  return query;
};
