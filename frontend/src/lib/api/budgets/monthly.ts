import { apiFetch } from "@/lib/api";
import { ApiError } from "@/lib/ApiError";
import { LastMonthlyBudget, MonthlyBudget } from "@/types";
import { MonthlyBudgetForm } from "@shared/schemas";

export const fetchCurrentBudget = async (): Promise<MonthlyBudget | null> => {
  const response = await fetch(`/api/monthly-budgets/current`, {
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(
      response.status,
      data.error || "Budget mensuel non disponible",
    );
  }
  return response.json();
};

export const getBudgetById = async (
  budgetId: string,
): Promise<MonthlyBudget> => {
  const response = await fetch(`/api/monthly-budgets/${budgetId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Budget non disponible");
  }
  return response.json();
};

export const fetchLastBudgets = async (): Promise<LastMonthlyBudget[]> => {
  const response = await fetch(`/api/monthly-budgets/history`, {
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

export const updateMonthlyBudgetStatus = async (
  budgetId: string,
  isCurrent: boolean,
): Promise<MonthlyBudget> => {
  return apiFetch(`/api/monthly-budgets/${budgetId}`, {
    method: "PATCH",
    body: JSON.stringify({ isCurrent }),
  });
};

export const createMonthlyBudget = async (
  budget: MonthlyBudgetForm,
): Promise<MonthlyBudget> => {
  return apiFetch(`/api/monthly-budgets`, {
    method: "POST",
    body: JSON.stringify(budget),
  });
};

export const getBudgetByDate = async (
  year: number,
  month: number,
): Promise<LastMonthlyBudget> => {
  return apiFetch(`/api/monthly-budgets?month=${month}&year=${year}`);
};

export const deleteMonthlyBudget = async (
  budgetId: string,
): Promise<{ id: string; isCurrent: boolean }> => {
  return apiFetch(`/api/monthly-budgets/${budgetId}`, {
    method: "DELETE",
  });
};
