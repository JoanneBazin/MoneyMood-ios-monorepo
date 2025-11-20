import {
  addFixedIncomes,
  deleteFixedIncomes,
  updateFixedIncome,
} from "@/lib/api/fixedIncomes";
import { useBudgetStore } from "@/stores/budgetStore";
import { UpdateFixedEntryParams } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";
import { useMutation } from "@tanstack/react-query";

export const useAddFixedIncomesMutation = () => {
  const { fixedIncomes, setFixedIncomes } = useBudgetStore.getState();
  return useMutation({
    mutationFn: (incomes: BaseEntryOutput[]) => addFixedIncomes(incomes),
    onSuccess: (incomes) => {
      setFixedIncomes([...fixedIncomes, ...incomes]);
    },
  });
};

export const useUpdateFixedIncomeMutation = () => {
  return useMutation({
    mutationFn: ({ entry, entryId }: UpdateFixedEntryParams) =>
      updateFixedIncome(entry, entryId),
    onSuccess: (updatedIncome) => {
      const { fixedIncomes, setFixedIncomes } = useBudgetStore.getState();
      const updatedIncomes = fixedIncomes.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      );

      setFixedIncomes(updatedIncomes);
    },
  });
};

export const useDeleteFixedIncomeMutation = () => {
  return useMutation({
    mutationFn: (incomeId: string) => deleteFixedIncomes(incomeId),
    onSuccess: (result) => {
      const { fixedIncomes, setFixedIncomes } = useBudgetStore.getState();
      const updatedIncomes = fixedIncomes.filter(
        (income) => income.id !== result.id
      );

      setFixedIncomes(updatedIncomes);
    },
  });
};
