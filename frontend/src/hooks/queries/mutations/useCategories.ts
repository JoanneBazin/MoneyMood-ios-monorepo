import {
  addSpecialCategory,
  deleteSpecialCategory,
  deleteSpecialCategoryOnCascade,
  updateSpecialCategory,
} from "@/lib/api";
import {
  AddSpecialCategoryParams,
  DeleteSpecialCategoryParams,
  SpecialBudget,
  UpdateSpecialCategoryParams,
} from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSpecialCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ category, budgetId }: AddSpecialCategoryParams) =>
      addSpecialCategory(category, budgetId),
    onSuccess: (newCategory, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          categories: [...prev.categories, { ...newCategory }],
        }),
      );
    },
  });
};

export const useUpdateSpecialCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      category,
      categoryId,
      budgetId,
    }: UpdateSpecialCategoryParams) =>
      updateSpecialCategory(category, categoryId, budgetId),
    onSuccess: (updatedCategory, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          categories: prev.categories.map((cat) =>
            cat.id === variables.categoryId
              ? { ...cat, name: updatedCategory.name }
              : cat,
          ),
        }),
      );
    },
  });
};

export const useDeleteSpecialCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, budgetId }: DeleteSpecialCategoryParams) =>
      deleteSpecialCategory(categoryId, budgetId),
    onSuccess: (deletedCategory, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          expenses: [...prev.expenses, ...deletedCategory.expenses],
          categories: prev.categories.filter(
            (cat) => cat.id !== deletedCategory.id,
          ),
        }),
      );
    },
  });
};

export const useDeleteSpecialCategoryOnCascadeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, budgetId }: DeleteSpecialCategoryParams) =>
      deleteSpecialCategoryOnCascade(categoryId, budgetId),
    onSuccess: (result, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          remainingBudget: result.remainingBudget,
          categories: prev.categories.filter(
            (cat) => cat.id !== variables.categoryId,
          ),
        }),
      );
    },
  });
};
