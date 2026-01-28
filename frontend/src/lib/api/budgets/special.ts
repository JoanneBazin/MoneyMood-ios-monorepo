import { SpecialBudgetForm } from "@shared/schemas";
import { SpecialBudget, SpecialBudgetItem } from "@/types";
import { getCurrentOnlineStatus } from "@/lib/network";
import { ApiError } from "@/lib/ApiError";

export const fetchAllSpecialBudgets = async (): Promise<
  SpecialBudgetItem[]
> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets`, {
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Aucun budget trouvé");
  }
  return response.json();
};

export const fetchSpecialBudget = async (
  id: string
): Promise<SpecialBudget> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Aucun budget trouvé");
  }
  return response.json();
};

export const addSpecialBudget = async (
  newBudget: SpecialBudgetForm
): Promise<SpecialBudget> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(newBudget),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const updateSpecialBudget = async (
  budget: SpecialBudgetForm,
  id: string
): Promise<SpecialBudget> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(budget),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteSpecialBudget = async (
  id: string
): Promise<{ id: string }> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }
  return response.json();
};
