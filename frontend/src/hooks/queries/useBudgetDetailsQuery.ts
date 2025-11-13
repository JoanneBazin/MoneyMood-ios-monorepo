import { fetchSpecialBudget } from "@/lib/api/specialBudgets";
import { useBudgetStore } from "@/stores/budgetStore";
import { SpecialBudget } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useBudgetDetailsQuery = (id: string) => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  const query = useQuery<SpecialBudget>({
    queryKey: ["specialBudget", id],
    queryFn: () => fetchSpecialBudget(id),
  });

  useEffect(() => {
    if (query.data) setPageTitle(query.data?.name);
  }, [query.data]);
  return query;
};
