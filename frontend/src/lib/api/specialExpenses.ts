import {
  AddSpecialExpensesProps,
  DeleteExpenseProps,
  UpdateSpecialExpensesProps,
} from "@/types";
import { getCurrentOnlineStatus } from "../network";
import { ApiError } from "../ApiError";

export const addSpecialExpenses = async ({
  expenses,
  budgetId,
}: AddSpecialExpensesProps) => {
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

export const updateSpecialExpense = async ({
  expense,
  budgetId,
}: UpdateSpecialExpensesProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/special-budgets/${budgetId}/expenses/${expense.id}`,
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

export const deleteSpecialExpense = async ({
  expenseId,
  budgetId,
}: DeleteExpenseProps) => {
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

  const result = await response.json();

  return {
    expenseId,
    remainingBudget: result.remainingBudget,
  };
};
