import { fetchSpecialBudget } from "@/lib/api";
import { SpecialBudget } from "@/types";
import { QueryClient, useQuery } from "@tanstack/react-query";

export const useBudgetDetailsQuery = (id: string | undefined) => {
  const query = useQuery<SpecialBudget>({
    queryKey: ["specialBudget", id],
    queryFn: () => fetchSpecialBudget(id!),
    enabled: !!id,
  });

  return query;
};

export const getCategories = (id: string, queryClient: QueryClient) => {
  const budget = queryClient.getQueryData([
    "specialBudget",
    id,
  ]) as SpecialBudget;
  return budget.categories.map((cat) => ({ id: cat.id, name: cat.name }));
};
