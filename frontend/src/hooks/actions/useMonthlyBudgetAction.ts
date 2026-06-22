import {
  MonthlyBudgetForm,
  monthlyBudgetSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useCreateBudgetMutation,
  useDeleteMonthlyBudgetMutation,
  useUpdateBudgetStatusMutation,
} from "../queries/mutations";
import { useState } from "react";
import { extractArrayErrors, getErrorMessage } from "@/lib/error-helpers";

export const useMonthlyBudgetAction = () => {
  const addMutation = useCreateBudgetMutation();
  const updateMutation = useUpdateBudgetStatusMutation();
  const deleteMutation = useDeleteMonthlyBudgetMutation();

  const [addIncomesValidationErrors, setAddIncomesValidationErrors] = useState<
    Record<string, string>[] | null
  >(null);
  const [addChargesValidationErrors, setAddChargesValidationErrors] = useState<
    Record<string, string>[] | null
  >(null);

  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const addMonthlyBudget = (
    budget: MonthlyBudgetForm,
    onSuccess?: () => void,
  ) => {
    setAddChargesValidationErrors(null);
    setAddIncomesValidationErrors(null);
    setDashboardError(null);

    const { data, success, errors } = validateWithSchema(
      monthlyBudgetSchema,
      budget,
    );
    if (!success) {
      setAddIncomesValidationErrors(extractArrayErrors(errors, "incomes"));
      setAddChargesValidationErrors(extractArrayErrors(errors, "charges"));
      return;
    }

    addMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => setDashboardError(getErrorMessage(error)),
    });
  };

  const updateBudgetStatus = (
    budgetId: string,
    isCurrent: boolean,
    onSuccess?: () => void,
  ) => {
    setDashboardError(null);

    updateMutation.mutate(
      { budgetId, isCurrent },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => setDashboardError(getErrorMessage(error)),
      },
    );
  };

  const deleteMonthlyBudget = (budgetId: string, onSuccess?: () => void) => {
    setModalError(null);

    deleteMutation.mutate(budgetId, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => setModalError(getErrorMessage(error)),
    });
  };

  return {
    actions: {
      addMonthlyBudget,
      updateBudgetStatus,
      deleteMonthlyBudget,
      clearAddIncomesValidationErrors: () =>
        setAddIncomesValidationErrors(null),
      clearAddChargesValidationErrors: () =>
        setAddChargesValidationErrors(null),
      clearModalErrors: () => {
        setModalError(null);
      },
    },
    state: {
      addIncomesValidationErrors,
      addChargesValidationErrors,
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
