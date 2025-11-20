import { ExpenseEntry, ExpensesResponse } from "@/types";
import { getCurrentOnlineStatus } from "../network";
import { ApiError } from "../ApiError";
import { ExpenseOutput } from "@moneymood-monorepo/shared";
import { BaseEntryOutput } from "@shared/schemas";

export const addExpenses = async (
  expenses: ExpenseOutput[],
  budgetId: string
): Promise<ExpensesResponse<ExpenseEntry[]>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/${budgetId}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(expenses),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const updateExpense = async (
  expense: BaseEntryOutput,
  expenseId: string,
  budgetId: string
): Promise<ExpensesResponse<ExpenseEntry>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets/${budgetId}/expenses/${expenseId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(expense),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteExpense = async (
  expenseId: string,
  budgetId: string
): Promise<ExpensesResponse<{ id: string }>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets/${budgetId}/expenses/${expenseId}`,
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
