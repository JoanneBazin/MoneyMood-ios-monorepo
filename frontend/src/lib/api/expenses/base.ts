import { ApiError } from "@/lib/ApiError";
import { getCurrentOnlineStatus } from "@/lib/network";
import { ExpensesResponse } from "@/types";

type BudgetType = "monthly" | "special";

export const addExpensesBase = async <TExpense, TEntry>(
  expenses: TExpense[],
  budgetId: string,
  type: BudgetType
): Promise<ExpensesResponse<TEntry[]>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/${type}-budgets/${budgetId}/expenses`, {
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

export const updateExpenseBase = async <TExpense, TEntry>(
  expense: TExpense,
  expenseId: string,
  budgetId: string,
  type: BudgetType
): Promise<ExpensesResponse<TEntry>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/${type}-budgets/${budgetId}/expenses/${expenseId}`,
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

export const deleteExpenseBase = async (
  expenseId: string,
  budgetId: string,
  type: BudgetType
): Promise<ExpensesResponse<{ id: string }>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/${type}-budgets/${budgetId}/expenses/${expenseId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};
