import { apiFetch } from "@/lib/api";
import { ExpensesResponse } from "@/types";

type BudgetType = "monthly" | "special";

export const addExpensesBase = async <TExpense, TEntry>(
  expenses: TExpense[],
  budgetId: string,
  type: BudgetType,
): Promise<ExpensesResponse<TEntry[]>> => {
  return apiFetch(`/api/${type}-budgets/${budgetId}/expenses`, {
    method: "POST",
    body: JSON.stringify(expenses),
  });
};

export const updateExpenseBase = async <TExpense, TEntry>(
  expense: TExpense,
  expenseId: string,
  budgetId: string,
  type: BudgetType,
): Promise<ExpensesResponse<TEntry>> => {
  return apiFetch(`/api/${type}-budgets/${budgetId}/expenses/${expenseId}`, {
    method: "PUT",
    body: JSON.stringify(expense),
  });
};

export const updateExpenseValidationBase = async <TEntry>(
  cashed: boolean,
  expenseId: string,
  budgetId: string,
  type: BudgetType,
): Promise<TEntry> => {
  return apiFetch(
    `/api/${type}-budgets/${budgetId}/expenses/${expenseId}/cashed`,
    {
      method: "PATCH",
      body: JSON.stringify({ cashed }),
    },
  );
};

export const deleteExpenseBase = async (
  expenseId: string,
  budgetId: string,
  type: BudgetType,
): Promise<ExpensesResponse<{ id: string }>> => {
  return apiFetch(`/api/${type}-budgets/${budgetId}/expenses/${expenseId}`, {
    method: "DELETE",
  });
};
