import { BaseEntryOutput, ExpenseOutput } from "@shared/schemas";
import { addExpensesBase, deleteExpenseBase, updateExpenseBase } from "./base";
import { ExpenseEntry } from "@/types";

export const addMonthlyExpenses = async (
  expenses: ExpenseOutput[],
  budgetId: string
) =>
  addExpensesBase<ExpenseOutput, ExpenseEntry>(expenses, budgetId, "monthly");

export const updateMonthlyExpense = async (
  expense: BaseEntryOutput,
  expenseId: string,
  budgetId: string
) =>
  updateExpenseBase<BaseEntryOutput, ExpenseEntry>(
    expense,
    expenseId,
    budgetId,
    "monthly"
  );

export const deleteMonthlyExpense = async (
  expenseId: string,
  budgetId: string
) => deleteExpenseBase(expenseId, budgetId, "monthly");
