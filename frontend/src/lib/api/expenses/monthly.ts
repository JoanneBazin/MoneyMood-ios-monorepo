import { BaseEntryOutput, ExpenseOutput } from "@shared/schemas";
import {
  addExpensesBase,
  deleteExpenseBase,
  updateExpenseBase,
  updateExpenseValidationBase,
} from "./base";
import { MonthlyExpenseEntry } from "@/types";

export const addMonthlyExpenses = async (
  expenses: ExpenseOutput[],
  budgetId: string
) =>
  addExpensesBase<ExpenseOutput, MonthlyExpenseEntry>(
    expenses,
    budgetId,
    "monthly"
  );

export const updateMonthlyExpense = async (
  expense: BaseEntryOutput,
  expenseId: string,
  budgetId: string
) =>
  updateExpenseBase<BaseEntryOutput, MonthlyExpenseEntry>(
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
  updateExpenseValidationBase<MonthlyExpenseEntry>(
    cashed,
    expenseId,
    budgetId,
    "monthly"
  );

export const deleteMonthlyExpense = async (
  expenseId: string,
  budgetId: string
) => deleteExpenseBase(expenseId, budgetId, "monthly");
