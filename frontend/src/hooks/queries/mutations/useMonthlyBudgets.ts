import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MonthlyBudgetForm } from "@shared/schemas";
import {
  createMonthlyBudget,
  deleteMonthlyBudget,
  updateMonthlyBudgetStatus,
} from "@/lib/api/monthlyBudgets";

import { hydrateBudgetStore } from "@/lib/hydrateBudgetStore";

import { useNavigate } from "react-router-dom";
import { UpdateMonthlyBudgetParams } from "@/types";

export const useCreateBudgetMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (budget: MonthlyBudgetForm) => createMonthlyBudget(budget),
    onSuccess: (budget) => {
      if (budget.isCurrent) {
        hydrateBudgetStore(budget);
      }
      queryClient.invalidateQueries({ queryKey: ["history"] });
      navigate("/app");
    },
  });
};

export const useUpdateBudgetStatusMutation = () => {
  const queryClient = useQueryClient();
  const { setCurrentBudget, setWeeksInMonth } = useBudgetStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ budgetId, isCurrent }: UpdateMonthlyBudgetParams) =>
      updateMonthlyBudgetStatus(budgetId, isCurrent),
    onSuccess: (budget) => {
      if (budget.isCurrent) {
        hydrateBudgetStore(budget);
      } else {
        setCurrentBudget(null);
        setWeeksInMonth([]);
      }

      queryClient.invalidateQueries({ queryKey: ["history"] });
      navigate("/app");
    },
  });
};

export const useDeleteMonthlyBudgetMutation = () => {
  const queryClient = useQueryClient();
  const { currentBudget, setCurrentBudget, setWeeksInMonth } =
    useBudgetStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (budgetId: string) => deleteMonthlyBudget(budgetId),
    onSuccess: (result) => {
      if (!currentBudget) return;

      if (currentBudget.id === result.id) {
        setCurrentBudget(null);
        setWeeksInMonth([]);
      } else {
        queryClient.invalidateQueries({ queryKey: ["history"] });
      }
      navigate("/app");
    },
  });
};
