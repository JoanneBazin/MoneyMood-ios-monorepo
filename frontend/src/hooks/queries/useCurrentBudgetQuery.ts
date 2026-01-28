import { fetchCurrentBudget } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { MonthlyBudget, MonthlyBudgetWithWeeks } from "@/types";
import { getWeeksInMonth } from "@/lib/weeks-helpers";

export const useCurrentBudgetQuery = () => {
  const { isOnline } = useOfflineStatus();
  return useQuery<MonthlyBudget | null, Error, MonthlyBudgetWithWeeks | null>({
    queryKey: ["currentBudget"],
    queryFn: fetchCurrentBudget,
    enabled: isOnline,
    select: (budget) => {
      if (!budget) return null;
      return {
        ...budget,
        weeksInMonth: getWeeksInMonth(budget.year, budget.month),
      };
    },
  });
};
