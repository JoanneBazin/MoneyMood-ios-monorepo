import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MonthlyBudgetForm } from "@shared/schemas";
import {
  createMonthlyBudget,
  deleteMonthlyBudget,
  updateMonthlyBudgetStatus,
} from "@/lib/api/monthlyBudgets";

import { useNavigate } from "react-router-dom";
import { MonthlyBudgetWithWeeks, UpdateMonthlyBudgetParams } from "@/types";
import { getWeeksInMonth } from "@/lib/weeks-helpers";

export const useCreateBudgetMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (budget: MonthlyBudgetForm) => createMonthlyBudget(budget),
    onSuccess: (budget) => {
      queryClient.setQueryData(["currentBudget"], {
        ...budget,
        weeksInMonth: getWeeksInMonth(budget.year, budget.month),
      });
      queryClient.invalidateQueries({ queryKey: ["history"] });
      navigate("/app");
    },
  });
};

export const useUpdateBudgetStatusMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ budgetId, isCurrent }: UpdateMonthlyBudgetParams) =>
      updateMonthlyBudgetStatus(budgetId, isCurrent),
    onSuccess: (budget) => {
      if (budget.isCurrent) {
        queryClient.setQueryData(["currentBudget"], {
          ...budget,
          weeksInMonth: getWeeksInMonth(budget.year, budget.month),
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["currentBudget"] });
      }

      queryClient.invalidateQueries({ queryKey: ["history"] });
      navigate("/app");
    },
  });
};

export const useDeleteMonthlyBudgetMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (budgetId: string) => deleteMonthlyBudget(budgetId),
    onSuccess: ({ isCurrent }) => {
      if (isCurrent) {
        queryClient.invalidateQueries({ queryKey: ["currentBudget"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["history"] });
        navigate("/app/history");
      }
    },
  });
};
