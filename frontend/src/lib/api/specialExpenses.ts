import { ExpensesResponse, SpecialExpenseEntry } from "@/types";
import { getCurrentOnlineStatus } from "../network";
import { ApiError } from "../ApiError";
import { SpecialExpenseOutput } from "@shared/schemas";

export const addSpecialExpenses = async (
  expenses: SpecialExpenseOutput[],
  budgetId: string
): Promise<ExpensesResponse<SpecialExpenseEntry[]>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/special-budgets/${budgetId}/expenses`, {
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

export const updateSpecialExpense = async (
  expense: SpecialExpenseOutput,
  expenseId: string,
  budgetId: string
): Promise<ExpensesResponse<SpecialExpenseEntry>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/special-budgets/${budgetId}/expenses/${expenseId}`,
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

export const deleteSpecialExpense = async (
  expenseId: string,
  budgetId: string
): Promise<ExpensesResponse<{ id: string }>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/special-budgets/${budgetId}/expenses/${expenseId}`,
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
