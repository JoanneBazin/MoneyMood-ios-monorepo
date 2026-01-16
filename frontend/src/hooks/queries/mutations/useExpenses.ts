import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AddExpensesParams,
  DeleteExpenseParams,
  MonthlyBudgetWithWeeks,
  UpdateExpenseParams,
} from "@/types";
import {
  addMonthlyExpenses,
  deleteMonthlyExpense,
  updateMonthlyExpense,
} from "@/lib/api";

export const useAddExpensesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ expenses, budgetId }: AddExpensesParams) =>
      addMonthlyExpenses(expenses, budgetId),
    onSuccess: ({ data, remainingBudget }) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          expenses: [...prev.expenses, ...data],
        })
      );
    },
  });
};

export const useUpdateExpenseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ expense, expenseId, budgetId }: UpdateExpenseParams) =>
      updateMonthlyExpense(expense, expenseId, budgetId),
    onSuccess: ({ data, remainingBudget }) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          expenses: prev.expenses.map((e) => (e.id === data.id ? data : e)),
        })
      );
    },
  });
};

export const useDeleteExpenseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ expenseId, budgetId }: DeleteExpenseParams) =>
      deleteMonthlyExpense(expenseId, budgetId),
    onSuccess: ({ data, remainingBudget }) => {
      queryClient.setQueryData(
        ["currentBudget"],
        (prev: MonthlyBudgetWithWeeks) => ({
          ...prev,
          remainingBudget,
          expenses: prev.expenses.filter((expense) => expense.id !== data.id),
        })
      );
    },
  });
};
