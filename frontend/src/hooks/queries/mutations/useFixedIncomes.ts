import {
  addFixedIncomes,
  deleteFixedIncome,
  updateFixedIncome,
} from "@/lib/api";
import { Entry, UpdateFixedEntryParams } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFixedIncomesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (incomes: BaseEntryOutput[]) => addFixedIncomes(incomes),
    onSuccess: (incomes) => {
      queryClient.setQueryData(["fixedIncomes"], (prev: Entry[]) => [
        ...prev,
        ...incomes,
      ]);
    },
  });
};

export const useUpdateFixedIncomeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entry, entryId }: UpdateFixedEntryParams) =>
      updateFixedIncome(entry, entryId),
    onSuccess: (updatedIncome) => {
      queryClient.setQueryData(["fixedIncomes"], (prev: Entry[]) =>
        prev.map((c) => (c.id === updatedIncome.id ? updatedIncome : c))
      );
    },
  });
};

export const useDeleteFixedIncomeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (incomeId: string) => deleteFixedIncome(incomeId),
    onSuccess: (result) => {
      queryClient.setQueryData(["fixedIncomes"], (prev: Entry[]) =>
        prev.filter((c) => c.id !== result.id)
      );
    },
  });
};
