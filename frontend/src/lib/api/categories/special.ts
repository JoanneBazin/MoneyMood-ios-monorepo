import { CategoryEntryForm } from "@shared/schemas";

import { DeleteSpecialCategoryResponse, SpecialBudgetCategory } from "@/types";
import { apiFetch } from "@/lib/apiFetch";

export const addSpecialCategory = async (
  category: CategoryEntryForm,
  budgetId: string,
): Promise<SpecialBudgetCategory> => {
  return apiFetch(`/api/special-budgets/${budgetId}/categories`, {
    method: "POST",
    body: JSON.stringify(category),
  });
};

export const updateSpecialCategory = async (
  category: CategoryEntryForm,
  categoryId: string,
  budgetId: string,
): Promise<SpecialBudgetCategory> => {
  return apiFetch(`/api/special-budgets/${budgetId}/categories/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify(category),
  });
};

export const deleteSpecialCategory = async (
  categoryId: string,
  budgetId: string,
): Promise<DeleteSpecialCategoryResponse> => {
  return apiFetch(`/api/special-budgets/${budgetId}/categories/${categoryId}`, {
    method: "DELETE",
  });
};

export const deleteSpecialCategoryOnCascade = async (
  categoryId: string,
  budgetId: string,
): Promise<{ remainingBudget: number }> => {
  return apiFetch(
    `/api/special-budgets/${budgetId}/categories/${categoryId}/cascade`,
    {
      method: "DELETE",
    },
  );
};
