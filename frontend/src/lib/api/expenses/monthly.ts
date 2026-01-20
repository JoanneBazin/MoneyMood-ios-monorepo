import { BaseEntryOutput, ExpenseOutput } from "@shared/schemas";
import {
  addExpensesBase,
  deleteExpenseBase,
  updateExpenseBase,
  updateExpenseValidationBase,
} from "./base";
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

export const updateMonthlyExpenseValidation = async (
  cashed: boolean,
  expenseId: string,
  budgetId: string
) =>
  updateExpenseValidationBase<ExpenseEntry>(
    cashed,
    expenseId,
    budgetId,
    "monthly"
  );

export const deleteMonthlyExpense = async (
  expenseId: string,
  budgetId: string
) => deleteExpenseBase(expenseId, budgetId, "monthly");
