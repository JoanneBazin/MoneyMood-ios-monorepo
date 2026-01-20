import {
  BaseEntryOutput,
  ExpenseOutput,
  SpecialExpenseOutput,
} from "@shared/schemas";
import { ExpenseEntry } from "./entries";

export interface WeeklyExpensesDisplayProps {
  budgetId: string;
  weeklyBudget: number;
  expenses: ExpenseEntry[];
  edit?: boolean;
  oldDate?: {
    year: number;
    month: number;
  };
}

// Mutations

interface BaseExpenseParams {
  expenseId: string;
  budgetId: string;
}

export interface AddExpensesParams {
  expenses: ExpenseOutput[];
  budgetId: string;
}
export interface AddSpecialExpensesParams {
  expenses: SpecialExpenseOutput[];
  budgetId: string;
  categoryId?: string;
}

export interface UpdateExpenseParams extends BaseExpenseParams {
  expense: BaseEntryOutput;
}
export interface UpdateSpecialExpenseParams extends BaseExpenseParams {
  expense: SpecialExpenseOutput;
}
export interface UpdateExpenseValidationParams extends BaseExpenseParams {
  cashed: boolean;
}

export interface DeleteExpenseParams extends BaseExpenseParams {}
export interface DeleteSpecialExpenseParams extends BaseExpenseParams {
  categoryId?: string;
}

export interface ExpensesResponse<T> {
  data: T;
  remainingBudget: number;
}
