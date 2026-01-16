import {
  addSpecialExpenses,
  deleteSpecialExpense,
  updateSpecialExpense,
} from "@/lib/api";
import {
  AddSpecialExpensesParams,
  DeleteSpecialExpenseParams,
  SpecialBudget,
  UpdateSpecialExpenseParams,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSpecialExpenseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expenses,
      budgetId,
      categoryId,
    }: AddSpecialExpensesParams) => addSpecialExpenses(expenses, budgetId),
    onSuccess: ({ data, remainingBudget }, variables) => {
      if (variables.categoryId) {
        queryClient.setQueryData(
          ["specialBudget", variables.budgetId],
          (prev: SpecialBudget) => ({
            ...prev,
            remainingBudget,
            categories: prev.categories.map((cat) =>
              cat.id === variables.categoryId
                ? { ...cat, expenses: [...cat.expenses, ...data] }
                : cat
            ),
          })
        );
      } else {
        queryClient.setQueryData(
          ["specialBudget", variables.budgetId],
          (prev: SpecialBudget) => ({
            ...prev,
            remainingBudget,
            expenses: [...prev.expenses, ...data],
          })
        );
      }
    },
  });
};

export const useUpdateSpecialExpenseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expense,
      expenseId,
      budgetId,
    }: UpdateSpecialExpenseParams) =>
      updateSpecialExpense(expense, expenseId, budgetId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["specialBudget", variables.budgetId],
      });
    },
  });
};

export const useDeleteSpecialExpenseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expenseId,
      budgetId,
      categoryId,
    }: DeleteSpecialExpenseParams) => deleteSpecialExpense(expenseId, budgetId),
    onSuccess: ({ data, remainingBudget }, variables) => {
      if (variables.categoryId) {
        queryClient.setQueryData(
          ["specialBudget", variables.budgetId],
          (prev: SpecialBudget) => ({
            ...prev,
            remainingBudget,
            categories: prev.categories.map((cat) =>
              cat.id === variables.categoryId
                ? {
                    ...cat,
                    expenses: cat.expenses.filter((exp) => exp.id !== data.id),
                  }
                : cat
            ),
          })
        );
      } else {
        queryClient.setQueryData(
          ["specialBudget", variables.budgetId],
          (prev: SpecialBudget) => ({
            ...prev,
            remainingBudget,
            expenses: prev.expenses.filter((e) => e.id !== data.id),
          })
        );
      }
    },
  });
};
