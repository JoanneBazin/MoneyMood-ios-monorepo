import { apiFetch } from "@/lib/apiFetch";
import { LastMonthlyBudget, MonthlyBudget } from "@/types";
import { MonthlyBudgetOutput } from "@shared/schemas";

export const fetchCurrentBudget = async (): Promise<MonthlyBudget | null> => {
  return apiFetch(`/api/monthly-budgets/current`);
};

export const getBudgetById = async (
  budgetId: string,
): Promise<MonthlyBudget> => {
  return apiFetch(`/api/monthly-budgets/${budgetId}`);
};

export const fetchLastBudgets = async (): Promise<LastMonthlyBudget[]> => {
  return apiFetch(`/api/monthly-budgets/history`);
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
  budget: MonthlyBudgetOutput,
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
