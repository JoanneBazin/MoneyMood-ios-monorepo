import { updateMonthlyBudgetProps } from "@/types";
import { MonthlyBudgetForm } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";

export const fetchCurrentBudget = async () => {
  const response = await fetch(`/api/monthly-budgets/current`, {
    credentials: "include",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) throw new Error("Budget actuel indisponible");

  return response.json();
};

export const updateMonthlyBudgetStatus = async ({
  budgetId,
  isCurrent,
}: updateMonthlyBudgetProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/${budgetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ isCurrent }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const createMonthlyBudget = async (budget: MonthlyBudgetForm) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(budget),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const getBudgetByDate = async (year: number, month: number) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets?month=${month}&year=${year}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Budget introuvable");

  return response.json();
};

export const getBudgetById = async (budgetId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/${budgetId}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Budget introuvable");

  return response.json();
};

export const fetchLastBudgets = async () => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/history`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Historique non disponible");

  return response.json();
};

export const deleteMonthlyBudget = async (budgetId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/${budgetId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};
