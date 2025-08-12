import {
  addFixedIncomes,
  deleteFixedIncomes,
  updateFixedIncome,
} from "@/lib/api/fixedIncomes";
import { useBudgetStore } from "@/stores/budgetStore";
import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFixedIncomesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (incomes: BudgetEntryForm[]) => addFixedIncomes(incomes),
    onSuccess: (incomes) => {
      const { fixedIncomes, setFixedIncomes } = useBudgetStore.getState();

      const updatedIncomes = [...fixedIncomes, ...incomes];

      setFixedIncomes(updatedIncomes);
      queryClient.setQueryData(["fixedIncomes"], updatedIncomes);
    },
  });
};

export const useUpdateFixedIncomeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (income: BudgetEntry) => updateFixedIncome(income),
    onSuccess: (updatedIncome) => {
      const { fixedIncomes, setFixedIncomes } = useBudgetStore.getState();
      const updatedIncomes = fixedIncomes.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      );

      setFixedIncomes(updatedIncomes);
      queryClient.setQueryData(["fixedIncomes"], updatedIncomes);
    },
  });
};

export const useDeleteFixedIncomeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (incomeId: string) => deleteFixedIncomes(incomeId),
    onSuccess: ({ incomeId }) => {
      const { fixedIncomes, setFixedIncomes } = useBudgetStore.getState();
      const updatedIncomes = fixedIncomes.filter(
        (income) => income.id !== incomeId
      );

      setFixedIncomes(updatedIncomes);
      queryClient.setQueryData(["fixedIncomes"], updatedIncomes);
    },
  });
};
