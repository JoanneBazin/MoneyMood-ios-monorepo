import {
  addMonthlyEntries,
  deleteMonthlyEntry,
  updateMonthlyEntry,
} from "@/lib/api/monthlyEntries";
import { useBudgetStore } from "@/stores/budgetStore";
import {
  AddMonthlyEntriesParams,
  DeleteMonthlyEntryParams,
  UpdateMonthlyEntryParams,
} from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useAddMonthlyEntriesMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ type, entries, budgetId }: AddMonthlyEntriesParams) =>
      addMonthlyEntries(type, entries, budgetId),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      if (!currentBudget) return;

      setCurrentBudget({
        ...currentBudget,
        remainingBudget,
        weeklyBudget,
        [variables.type]: [...currentBudget[variables.type], ...data],
      });
    },
  });
};

export const useUpdateMonthlyEntriesMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({
      type,
      entry,
      entryId,
      budgetId,
    }: UpdateMonthlyEntryParams) =>
      updateMonthlyEntry(type, entry, entryId, budgetId),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      if (!currentBudget) return;

      setCurrentBudget({
        ...currentBudget,
        remainingBudget,
        weeklyBudget,
        [variables.type]: currentBudget[variables.type].map((d) =>
          d.id === data.id ? data : d
        ),
      });
    },
  });
};

export const useDeleteMonthlyEntriesMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ type, entryId, budgetId }: DeleteMonthlyEntryParams) =>
      deleteMonthlyEntry(type, entryId, budgetId),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      if (!currentBudget) return;

      setCurrentBudget({
        ...currentBudget,
        remainingBudget,
        weeklyBudget,
        [variables.type]: currentBudget[variables.type].filter(
          (d) => d.id !== data.id
        ),
      });
    },
  });
};
