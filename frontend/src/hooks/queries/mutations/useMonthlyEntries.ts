import {
  addMonthlyEntries,
  deleteMonthlyEntry,
  updateMonthlyEntry,
} from "@/lib/api";
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
    mutationFn: ({ entries, budgetId, type }: AddMonthlyEntriesParams) =>
      addMonthlyEntries(entries, budgetId, type),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          weeklyBudget,
          [variables.type]: [...prev[variables.type], ...data],
        }),
      );
    },
  });
};

export const useUpdateMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      entry,
      entryId,
      budgetId,
      type,
    }: UpdateMonthlyEntryParams) =>
      updateMonthlyEntry(entry, entryId, budgetId, type),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          weeklyBudget,
          [variables.type]: prev[variables.type].map((d) =>
            d.id === data.id ? data : d,
          ),
        }),
      );
    },
  });
};

export const useDeleteMonthlyEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entryId, budgetId, type }: DeleteMonthlyEntryParams) =>
      deleteMonthlyEntry(entryId, budgetId, type),
    onSuccess: ({ data, remainingBudget, weeklyBudget }, variables) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          weeklyBudget,
          [variables.type]: prev[variables.type].filter(
            (d) => d.id !== data.id,
          ),
        }),
      );
    },
  });
};
