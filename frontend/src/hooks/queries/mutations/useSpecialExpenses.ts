import {
  addSpecialExpenses,
  deleteSpecialExpense,
  updateSpecialExpense,
} from "@/lib/api/specialExpenses";
import {
  AddSpecialExpensesProps,
  DeleteExpenseProps,
  SpecialBudget,
  UpdateExpenseProps,
  UpdateSpecialExpensesProps,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSpecialExpenseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ expenses, budgetId }: AddSpecialExpensesProps) =>
      addSpecialExpenses({ expenses, budgetId }),
    onSuccess: ({ expenses, remainingBudget }, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          remainingBudget,
          expenses: [...prev.expenses, ...expenses],
        })
      );

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateSpecialExpenseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ expense, budgetId }: UpdateExpenseProps) =>
      updateSpecialExpense({ expense, budgetId }),
    onSuccess: ({ updatedExpense, remainingBudget }, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          remainingBudget,
          expenses: prev.expenses.map((e) =>
            e.id === updatedExpense.id ? updatedExpense : e
          ),
        })
      );

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteSpecialExpenseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ expenseId, budgetId }: DeleteExpenseProps) =>
      deleteSpecialExpense({ expenseId, budgetId }),
    onSuccess: ({ expenseId, remainingBudget }, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          remainingBudget,
          expenses: prev.expenses.filter((e) => e.id !== expenseId),
        })
      );

      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
