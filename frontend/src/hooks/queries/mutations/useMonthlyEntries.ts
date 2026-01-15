import {
  addMonthlyEntries,
  deleteMonthlyEntry,
  updateMonthlyEntry,
} from "@/lib/api/monthlyEntries";
import {
  AddMonthlyEntriesParams,
  DeleteMonthlyEntryParams,
  MonthlyBudgetWithWeeks,
  UpdateMonthlyEntryParams,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, entries, budgetId }: AddMonthlyEntriesParams) =>
      addMonthlyEntries(type, entries, budgetId),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          weeklyBudget,
          [variables.type]: [...prev[variables.type], ...data],
        })
      );
    },
  });
};

export const useUpdateMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      type,
      entry,
      entryId,
      budgetId,
    }: UpdateMonthlyEntryParams) =>
      updateMonthlyEntry(type, entry, entryId, budgetId),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          weeklyBudget,
          [variables.type]: prev[variables.type].map((d) =>
            d.id === data.id ? data : d
          ),
        })
      );
    },
  });
};

export const useDeleteMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, entryId, budgetId }: DeleteMonthlyEntryParams) =>
      deleteMonthlyEntry(type, entryId, budgetId),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          weeklyBudget,
          [variables.type]: prev[variables.type].filter(
            (d) => d.id !== data.id
          ),
        })
      );
    },
  });
};
