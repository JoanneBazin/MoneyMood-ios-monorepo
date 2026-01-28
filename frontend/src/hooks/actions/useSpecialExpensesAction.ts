import {
  BaseEntryForm,
  baseEntrySchema,
  ExpenseInput,
  expenseSchema,
  SpecialExpenseInput,
  specialExpenseSchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddExpensesMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
  useUpdateExpenseValidationMutation,
  useUpdateSpecialBudgetMutation,
} from "../queries/mutations";
import { useState } from "react";
import { MonthlyExpenseEntry, SpecialExpenseEntry } from "@/types";
import {
  useAddSpecialExpenseMutation,
  useDeleteSpecialExpenseMutation,
  useUpdateSpecialExpenseMutation,
  useUpdateSpecialExpenseValidationMutation,
} from "../queries/mutations/useSpecialExpenses";

export const useSpecialExpensesAction = ({
  budgetId,
}: {
  budgetId: string;
}) => {
  const addMutation = useAddSpecialExpenseMutation();
  const updateMutation = useUpdateSpecialExpenseMutation();
  const updateValidationMutation = useUpdateSpecialExpenseValidationMutation();
  const deleteMutation = useDeleteSpecialExpenseMutation();

  const [addValidationErrors, setAddValidationErrors] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const addExpenses = (
    newExpenses: SpecialExpenseInput[],
    categoryId?: string,
    onSuccess?: () => void,
  ) => {
    setAddValidationErrors(null);
    setDashboardError(null);

    const { data, success, errors } = validateArrayWithSchema(
      specialExpenseSchema,
      newExpenses,
    );
    if (!success) {
      setAddValidationErrors(Object.values(errors));
      return;
    }

    addMutation.mutate(
      { expenses: data, budgetId, categoryId },
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
      specialExpenseSchema,
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

  const updateExpenseValidation = (expense: SpecialExpenseEntry) => {
    updateValidationMutation.mutate({
      cashed: !expense.cashed,
      expenseId: expense.id,
      budgetId,
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
