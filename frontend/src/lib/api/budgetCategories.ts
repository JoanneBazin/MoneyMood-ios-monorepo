import { CategoryEntryForm } from "@shared/schemas";
import { ApiError } from "../ApiError";
import { getCurrentOnlineStatus } from "../network";
import { DeleteSpecialCategoryResponse, SpecialBudgetCategory } from "@/types";

export const addSpecialCategory = async (
  category: CategoryEntryForm,
  budgetId: string
): Promise<SpecialBudgetCategory> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets/${budgetId}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const updateSpecialCategory = async (
  category: CategoryEntryForm,
  categoryId: string,
  budgetId: string
): Promise<SpecialBudgetCategory> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/special-budgets/${budgetId}/categories/${categoryId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(category),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteSpecialCategory = async (
  categoryId: string,
  budgetId: string
): Promise<DeleteSpecialCategoryResponse> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/special-budgets/${budgetId}/categories/${categoryId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteSpecialCategoryOnCascade = async (
  categoryId: string,
  budgetId: string
): Promise<{ remainingBudget: number }> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/special-budgets/${budgetId}/categories/${categoryId}/cascade`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};
