import {
  CategoryEntryForm,
  categorySchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";
import { getErrorMessage } from "@/lib/error-helpers";
import {
  useAddSpecialCategoryMutation,
  useDeleteSpecialCategoryMutation,
  useDeleteSpecialCategoryOnCascadeMutation,
  useUpdateSpecialCategoryMutation,
} from "../queries/mutations";

export const useCategoriesAction = ({ budgetId }: { budgetId: string }) => {
  const addMutation = useAddSpecialCategoryMutation();
  const updateMutation = useUpdateSpecialCategoryMutation();
  const deleteMutation = useDeleteSpecialCategoryMutation();
  const cascadeDeleteMutation = useDeleteSpecialCategoryOnCascadeMutation();

  const [addValidationErrors, setAddValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);
  const [updateValidationErrors, setUpdateValidationErrors] = useState<Record<
    string,
    string
  > | null>(null);

  const [modalError, setModalError] = useState<string | null>(null);

  const addCategory = (category: CategoryEntryForm, onSuccess?: () => void) => {
    setAddValidationErrors(null);
    setModalError(null);

    const { data, success, errors } = validateWithSchema(
      categorySchema,
      category,
    );
    if (!success) {
      setAddValidationErrors(errors);
      return;
    }

    addMutation.mutate(
      { category: data, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => setModalError(getErrorMessage(error)),
      },
    );
  };

  const updateCategory = (
    updatedCategory: CategoryEntryForm,
    categoryId: string,
    onSuccess?: () => void,
  ) => {
    setUpdateValidationErrors(null);
    setModalError(null);

    const { data, success, errors } = validateWithSchema(
      categorySchema,
      updatedCategory,
    );
    if (!success) {
      setUpdateValidationErrors(errors);
      return;
    }

    updateMutation.mutate(
      {
        category: data,
        categoryId,
        budgetId,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => setModalError(getErrorMessage(error)),
      },
    );
  };

  const deleteCategory = (categoryId: string, onSuccess?: () => void) => {
    setModalError(null);

    deleteMutation.mutate(
      { categoryId, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => setModalError(getErrorMessage(error)),
      },
    );
  };

  const deleteCategoryOnCascade = (
    categoryId: string,
    onSuccess?: () => void,
  ) => {
    setModalError(null);

    cascadeDeleteMutation.mutate(
      { categoryId, budgetId },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => setModalError(getErrorMessage(error)),
      },
    );
  };

  return {
    actions: {
      addCategory,
      updateCategory,
      deleteCategory,
      deleteCategoryOnCascade,
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
      isDeletingOnCascade: cascadeDeleteMutation.isPending,
    },
  };
};
