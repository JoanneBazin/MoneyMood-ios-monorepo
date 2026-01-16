import { SpecialExpenseOutput } from "@shared/schemas";
import { addExpensesBase, deleteExpenseBase, updateExpenseBase } from "./base";
import { SpecialExpenseEntry } from "@/types";

export const addSpecialExpenses = async (
  expenses: SpecialExpenseOutput[],
  budgetId: string
) =>
  addExpensesBase<SpecialExpenseOutput, SpecialExpenseEntry>(
    expenses,
    budgetId,
    "special"
  );

export const updateSpecialExpense = async (
  expense: SpecialExpenseOutput,
  expenseId: string,
  budgetId: string
) =>
  updateExpenseBase<SpecialExpenseOutput, SpecialExpenseEntry>(
    expense,
    expenseId,
    budgetId,
    "special"
  );

export const deleteSpecialExpense = async (
  expenseId: string,
  budgetId: string
) => deleteExpenseBase(expenseId, budgetId, "special");
