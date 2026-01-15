import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addExpenses,
  deleteExpense,
  updateExpense,
} from "@/lib/api/monthlyExpenses";
import {
  AddExpensesParams,
  DeleteExpenseParams,
  MonthlyBudgetWithWeeks,
  UpdateExpenseParams,
} from "@/types";

export const useAddExpensesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ expenses, budgetId }: AddExpensesParams) =>
      addExpenses(expenses, budgetId),
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
      updateExpense(expense, expenseId, budgetId),
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
      deleteExpense(expenseId, budgetId),
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
