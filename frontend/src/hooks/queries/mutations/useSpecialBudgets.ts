import {
  addSpecialCategory,
  deleteSpecialCategory,
  deleteSpecialCategoryOnCascade,
  updateSpecialCategory,
} from "@/lib/api/budgetCategories";
import {
  addSpecialBudget,
  deleteSpecialBudget,
  updateSpecialBudget,
} from "@/lib/api/specialBudgets";
import {
  AddSpecialCategoryParams,
  DeleteSpecialCategoryParams,
  SpecialBudget,
  UpdateSpecialBudgetParams,
  UpdateSpecialCategoryParams,
} from "@/types";
import { SpecialBudgetForm } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSpecialBudgetMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newBudget: SpecialBudgetForm) => addSpecialBudget(newBudget),
    onSuccess: (newBudget) => {
      queryClient.setQueryData(["specialBudget", newBudget.id], newBudget);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateSpecialBudgetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ budget, budgetId }: UpdateSpecialBudgetParams) =>
      updateSpecialBudget(budget, budgetId),
    onSuccess: (updatedBudget, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        updatedBudget
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteSpecialBudgetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (budgetId: string) => deleteSpecialBudget(budgetId),
    onSuccess: (result) => {
      queryClient.removeQueries({ queryKey: ["specialBudget", result.id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

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
        })
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
              : cat
          ),
        })
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
            (cat) => cat.id !== deletedCategory.id
          ),
        })
      );
    },
  });
};

export const useDeleteSpecialCategorOnCascadeyMutation = () => {
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
            (cat) => cat.id !== variables.categoryId
          ),
        })
      );
    },
  });
};
