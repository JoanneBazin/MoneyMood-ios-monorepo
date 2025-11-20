import { useBudgetStore } from "@/stores/budgetStore";
import { useMutation } from "@tanstack/react-query";
import {
  addExpenses,
  deleteExpense,
  updateExpense,
} from "@/lib/api/monthlyExpenses";
import {
  AddExpensesParams,
  DeleteExpenseParams,
  UpdateExpenseParams,
} from "@/types";

export const useAddExpensesMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ expenses, budgetId }: AddExpensesParams) =>
      addExpenses(expenses, budgetId),
    onSuccess: ({ data, remainingBudget }) => {
      if (!currentBudget) return;

      setCurrentBudget({
        ...currentBudget,
        remainingBudget,
        expenses: [...currentBudget.expenses, ...data],
      });
    },
  });
};

export const useUpdateExpenseMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ expense, expenseId, budgetId }: UpdateExpenseParams) =>
      updateExpense(expense, expenseId, budgetId),
    onSuccess: ({ data, remainingBudget }) => {
      if (!currentBudget) return;

      setCurrentBudget({
        ...currentBudget,
        remainingBudget,
        expenses: currentBudget.expenses.map((expense) =>
          expense.id === data.id ? data : expense
        ),
      });
    },
  });
};

export const useDeleteExpenseMutation = () => {
  const { currentBudget, setCurrentBudget } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ expenseId, budgetId }: DeleteExpenseParams) =>
      deleteExpense(expenseId, budgetId),
    onSuccess: ({ data, remainingBudget }) => {
      if (!currentBudget) return;

      setCurrentBudget({
        ...currentBudget,
        remainingBudget,
        expenses: currentBudget.expenses.filter(
          (expense) => expense.id !== data.id
        ),
      });
    },
  });
};
