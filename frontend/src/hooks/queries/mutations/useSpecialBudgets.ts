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
import { queryClient } from "@/lib/queryClient";
import {
  AddSpecialCategoryProps,
  SpecialBudget,
  UpdateSpecialBudgetType,
  UpdateSpecialCategoryProps,
} from "@/types";
import { SpecialBudgetForm } from "@shared/schemas";
import { useMutation } from "@tanstack/react-query";

export const useAddSpecialBudgetMutation = () => {
  return useMutation({
    mutationFn: (newBudget: SpecialBudgetForm) => addSpecialBudget(newBudget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateSpecialBudgetMutation = () => {
  return useMutation({
    mutationFn: ({ budget, id }: UpdateSpecialBudgetType) =>
      updateSpecialBudget(budget, id),
    onSuccess: (updatedBudget: SpecialBudgetForm, variables) => {
      queryClient.setQueryData(["specialBudget", variables.id], updatedBudget);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeletepecialBudgetMutation = () => {
  return useMutation({
    mutationFn: (budgetId: string) => deleteSpecialBudget(budgetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useAddSpecialCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ category, budgetId }: AddSpecialCategoryProps) =>
      addSpecialCategory(category, budgetId),
    onSuccess: (newCategory, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          categories: [...prev.categories, { ...newCategory, expenses: [] }],
        })
      );
    },
  });
};

export const useUpdateSpecialCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ category, budgetId }: UpdateSpecialCategoryProps) =>
      updateSpecialCategory(category, budgetId),
    onSuccess: (updatedCategory, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          categories: prev.categories.map((cat) =>
            cat.id === variables.category.id
              ? { ...cat, name: updatedCategory.name }
              : cat
          ),
        })
      );
    },
  });
};

export const useDeleteSpecialCategoryMutation = () => {
  return useMutation({
    mutationFn: ({ category, budgetId }: UpdateSpecialCategoryProps) =>
      deleteSpecialCategory(category.id, budgetId),
    onSuccess: (updatedCategory, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          expenses: [...prev.expenses, ...updatedCategory.expenses],
          categories: prev.categories.filter(
            (cat) => cat.id !== variables.category.id
          ),
        })
      );
    },
  });
};

export const useDeleteSpecialCategorOnCascadeyMutation = () => {
  return useMutation({
    mutationFn: ({ category, budgetId }: UpdateSpecialCategoryProps) =>
      deleteSpecialCategoryOnCascade(category.id, budgetId),
    onSuccess: (result, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        (prev: SpecialBudget) => ({
          ...prev,
          remainingBudget: result.remainingBudget,
          categories: prev.categories.filter(
            (cat) => cat.id !== variables.category.id
          ),
        })
      );
    },
  });
};
