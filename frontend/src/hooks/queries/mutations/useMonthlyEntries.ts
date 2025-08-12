import {
  addMonthlyEntries,
  deleteMonthlyEntry,
  updateMonthlyEntry,
} from "@/lib/api/monthlyEntries";
import { useBudgetStore } from "@/stores/budgetStore";
import {
  AddMonthlyEntriesProps,
  DeleteMonthlyEntryProps,
  UpdateMonthlyEntryProps,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ type, entries, budgetId }: AddMonthlyEntriesProps) =>
      addMonthlyEntries({ type, entries, budgetId }),
    onSuccess: ({ updated, remainingBudget, weeklyBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        charges: updated.charges
          ? [...currentBudget.charges, ...updated.charges]
          : [...currentBudget.charges],
        incomes: updated.incomes
          ? [...currentBudget.incomes, ...updated.incomes]
          : [...currentBudget.incomes],
        remainingBudget,
        weeklyBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};

export const useUpdateMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ type, entry, budgetId }: UpdateMonthlyEntryProps) =>
      updateMonthlyEntry({ type, entry, budgetId }),
    onSuccess: ({ updated, remainingBudget, weeklyBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        charges: updated.charge
          ? currentBudget.charges.map((charge) =>
              charge.id === updated.charge.id ? updated.charge : charge
            )
          : currentBudget.charges,
        incomes: updated.income
          ? currentBudget.incomes.map((income) =>
              income.id === updated.income.id ? updated.income : income
            )
          : currentBudget.incomes,
        remainingBudget,
        weeklyBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};

export const useDeleteMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ type, entryId, budgetId }: DeleteMonthlyEntryProps) =>
      deleteMonthlyEntry({ type, entryId, budgetId }),
    onSuccess: ({ updated, remainingBudget, weeklyBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        charges: updated.chargeId
          ? currentBudget.charges.filter(
              (entry) => entry.id !== updated.chargeId
            )
          : currentBudget.charges,
        incomes: updated.incomeId
          ? currentBudget.incomes.filter(
              (entry) => entry.id !== updated.incomeId
            )
          : currentBudget.incomes,
        remainingBudget,
        weeklyBudget,
      };

      setCurrentBudget(updatedBudget);
      queryClient.setQueryData(["currentBudget"], updatedBudget);
    },
  });
};
