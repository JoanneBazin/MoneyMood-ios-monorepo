import { SpecialBudgetForm } from "@shared/schemas";
import { SpecialBudget, SpecialBudgetItem } from "@/types";
import { ApiError } from "@/lib/ApiError";
import { apiFetch } from "@/lib/apiFetch";

export const fetchAllSpecialBudgets = async (): Promise<
  SpecialBudgetItem[]
> => {
  const response = await fetch(`/api/special-budgets`, {
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(
      response.status,
      data.error || "Budgets non disponibles",
    );
  }
  return response.json();
};

export const fetchSpecialBudget = async (
  id: string,
): Promise<SpecialBudget> => {
  const response = await fetch(`/api/special-budgets/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Budget non disponible");
  }
  return response.json();
};

export const addSpecialBudget = async (
  newBudget: SpecialBudgetForm,
): Promise<SpecialBudget> => {
  return apiFetch(`/api/special-budgets`, {
    method: "POST",
    body: JSON.stringify(newBudget),
  });
};

export const updateSpecialBudget = async (
  budget: SpecialBudgetForm,
  id: string,
): Promise<SpecialBudget> => {
  return apiFetch(`/api/special-budgets/${id}`, {
    method: "PUT",
    body: JSON.stringify(budget),
  });
};

export const deleteSpecialBudget = async (
  id: string,
): Promise<{ id: string }> => {
  return apiFetch(`/api/special-budgets/${id}`, {
    method: "DELETE",
  });
};
