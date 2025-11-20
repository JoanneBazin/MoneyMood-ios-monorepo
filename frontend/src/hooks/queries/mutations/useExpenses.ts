import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addExpenses,
  deleteExpense,
  updateExpense,
} from "@/lib/api/monthlyExpenses";
import {
  AddExpensesProps,
  DeleteExpenseProps,
  UpdateExpenseProps,
} from "@/types";

export const useAddExpensesMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ expenses, budgetId }: AddExpensesProps) =>
      addExpenses({ expenses, budgetId }),
    onSuccess: ({ expenses: newExpenses, remainingBudget }) => {
      if (!currentBudget) return;
      const updatedBudget = {
        ...currentBudget,
        expenses: [...currentBudget.expenses, ...newExpenses],
        remainingBudget,
      };

      setCurrentBudget(updatedBudget);
    },
  });
};

export const useUpdateExpenseMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ expense, budgetId }: UpdateExpenseProps) =>
      updateExpense({ expense, budgetId }),
    onSuccess: ({ updatedExpense, remainingBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        expenses: currentBudget.expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        ),
        remainingBudget,
      };
      setCurrentBudget(updatedBudget);
    },
  });
};

export const useDeleteExpenseMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ expenseId, budgetId }: DeleteExpenseProps) =>
      deleteExpense({ expenseId, budgetId }),
    onSuccess: ({ expenseId, remainingBudget }) => {
      if (!currentBudget) return;

      const updatedBudget = {
        ...currentBudget,
        expenses: currentBudget.expenses.filter(
          (expense) => expense.id !== expenseId
        ),
        remainingBudget,
      };
      setCurrentBudget(updatedBudget);
    },
  });
};
