import {
  BaseEntryOutput,
  ExpenseOutput,
  SpecialExpenseOutput,
} from "@shared/schemas";
import { MonthlyExpenseEntry } from "./entries";

export interface WeeklyExpensesDisplayProps {
  budgetId: string;
  weeklyBudget: number;
  expenses: MonthlyExpenseEntry[];
  edit?: boolean;
  oldDate?: {
    year: number;
    month: number;
  };
}

export interface WeeklyExpensesParams {
  expenses: MonthlyExpenseEntry[];
  weeklyBudget: number;
  edit: boolean;
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
  isCurrentBudget: boolean;
}

export interface DeleteExpenseParams extends BaseExpenseParams {}
export interface DeleteSpecialExpenseParams extends BaseExpenseParams {
  categoryId?: string;
}

export interface ExpensesResponse<T> {
  data: T;
  remainingBudget: number;
}
