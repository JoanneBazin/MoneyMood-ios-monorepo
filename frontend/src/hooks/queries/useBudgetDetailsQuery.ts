import { fetchSpecialBudget } from "@/lib/api/specialBudgets";
import { useAppStore } from "@/stores/appStore";
import { SpecialBudget } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useBudgetDetailsQuery = (id: string) => {
  const setPageTitle = useAppStore((s) => s.setPageTitle);

  const query = useQuery<SpecialBudget>({
    queryKey: ["specialBudget", id],
    queryFn: () => fetchSpecialBudget(id),
  });

  useEffect(() => {
    if (query.data) setPageTitle(query.data.name);
  }, [query.data]);
  return query;
};

export const getCategories = (id: string) => {
  const queryClient = useQueryClient();
  const budget = queryClient.getQueryData([
    "specialBudget",
    id,
  ]) as SpecialBudget;
  return budget.categories.map((cat) => ({ id: cat.id, name: cat.name }));
};
