import {
  SpecialBudgetForm,
  specialBudgetSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddSpecialBudgetMutation,
  useDeleteSpecialBudgetMutation,
  useUpdateSpecialBudgetMutation,
} from "../queries/mutations";
import { useState } from "react";
import { getErrorMessage } from "@/lib/error-helpers";

export const useSpecialBudgetAction = () => {
  const addMutation = useAddSpecialBudgetMutation();
  const updateMutation = useUpdateSpecialBudgetMutation();
  const deleteMutation = useDeleteSpecialBudgetMutation();

  const [addValidationErrors, setAddValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);
  const [updateValidationErrors, setUpdateValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);

  const [modalError, setModalError] = useState<string | null>(null);

  const addSpecialBudget = (
    budget: SpecialBudgetForm,
    onSuccess?: () => void,
  ) => {
    setAddValidationErrors(null);
    setModalError(null);

    const { data, success, errors } = validateWithSchema(
      specialBudgetSchema,
      budget,
    );
    if (!success) {
      setAddValidationErrors(errors);
      return;
    }

    addMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => setModalError(getErrorMessage(error)),
    });
  };

  const updateSpecialBudget = (
    updatedBudget: SpecialBudgetForm,
    budgetId: string,
    onSuccess?: () => void,
  ) => {
    setUpdateValidationErrors(null);
    setModalError(null);

    const { data, success, errors } = validateWithSchema(
      specialBudgetSchema,
      updatedBudget,
    );
    if (!success) {
      setUpdateValidationErrors(errors);
      return;
    }

    updateMutation.mutate(
      { budget: data, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => setModalError(getErrorMessage(error)),
      },
    );
  };

  const deleteSpecialBudget = (budgetId: string, onSuccess?: () => void) => {
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
      addSpecialBudget,
      updateSpecialBudget,
      deleteSpecialBudget,
      clearAddValidationErrors: () => setAddValidationErrors(null),
      clearUpdateValidationErrors: () => setUpdateValidationErrors(null),
      clearModalErrors: () => {
        setModalError(null);
        setAddValidationErrors(null);
        setUpdateValidationErrors(null);
      },
    },
    state: {
      addValidationErrors,
      updateValidationErrors,
      modalError,
    },
    status: {
      isAdding: addMutation.isPending,
      isUpdating: updateMutation.isPending,
      isDeleting: deleteMutation.isPending,
    },
  };
};
