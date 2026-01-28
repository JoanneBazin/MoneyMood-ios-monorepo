import {
  BaseEntryForm,
  baseEntrySchema,
  ExpenseInput,
  expenseSchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddExpensesMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
  useUpdateExpenseValidationMutation,
} from "../queries/mutations";
import { useState } from "react";
import { MonthlyExpenseEntry } from "@/types";

export const useWeeklyExpensesAction = ({ budgetId }: { budgetId: string }) => {
  const addMutation = useAddExpensesMutation();
  const updateMutation = useUpdateExpenseMutation();
  const updateValidationMutation = useUpdateExpenseValidationMutation();
  const deleteMutation = useDeleteExpenseMutation();

  const [addValidationErrors, setAddValidationErrors] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const addExpenses = (newExpenses: ExpenseInput[], onSuccess?: () => void) => {
    setAddValidationErrors(null);
    setDashboardError(null);

    const { data, success, errors } = validateArrayWithSchema(
      expenseSchema,
      newExpenses,
    );
    if (!success) {
      setAddValidationErrors(Object.values(errors));
      return;
    }

    addMutation.mutate(
      { expenses: data, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  const updateExpense = (
    updatedExpense: BaseEntryForm,
    expenseId: string,
    onSuccess?: () => void,
  ) => {
    setUpdateValidationError(null);
    setModalError(null);

    const { data, success, errors } = validateWithSchema(
      baseEntrySchema,
      updatedExpense,
    );

    if (!success) {
      setUpdateValidationError(errors);
      return;
    }

    updateMutation.mutate(
      { expense: data, expenseId, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () =>
          setModalError("Une erreur est survenue lors de la mise à jour"),
      },
    );
  };

  const updateExpenseValidation = (
    expense: MonthlyExpenseEntry,
    isCurrentBudget: boolean,
  ) => {
    updateValidationMutation.mutate({
      cashed: !expense.cashed,
      expenseId: expense.id,
      budgetId,
      isCurrentBudget,
    });
  };

  const deleteExpense = (expenseId: string, onSuccess?: () => void) => {
    setUpdateValidationError(null);
    setModalError(null);

    deleteMutation.mutate(
      { expenseId, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () =>
          setModalError("Une erreur est survenue lors de la suppression"),
      },
    );
  };

  return {
    actions: {
      addExpenses,
      updateExpense,
      updateExpenseValidation,
      deleteExpense,
      clearAddValidationErrors: () => setAddValidationErrors(null),
      clearUpdateErrors: () => {
        setUpdateValidationError(null);
        setModalError(null);
      },
    },
    state: {
      addValidationErrors,
      updateValidationError,
      dashboardError,
      modalError,
    },
    status: {
      isAdding: addMutation.isPending,
      isUpdating: updateMutation.isPending,
      isDeleting: deleteMutation.isPending,
    },
  };
};
