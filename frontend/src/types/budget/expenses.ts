import {
  BaseEntryOutput,
  ExpenseOutput,
  SpecialExpenseOutput,
} from "@shared/schemas";
import { ExpenseEntry } from "./entries";

export interface SpecialExpenseType {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  specialCategoryId: string | null;
}

export interface UpdateSpecialExpenseResponse {
  updatedExpense: SpecialExpenseType;
  remainingBudget: number;
}

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

export interface AddExpensesParams {
  expenses: ExpenseOutput[];
  budgetId: string;
}

export interface UpdateExpenseParams {
  expense: BaseEntryOutput;
  expenseId: string;
  budgetId: string;
}
export interface DeleteExpenseParams {
  expenseId: string;
  budgetId: string;
}

export interface AddSpecialExpensesParams {
  expenses: SpecialExpenseOutput[];
  budgetId: string;
  categoryId?: string;
}

export interface UpdateSpecialExpensesParams {
  expense: SpecialExpenseOutput;
  expenseId: string;
  budgetId: string;
}

export interface DeleteSpecialExpenseParams {
  expenseId: string;
  budgetId: string;
  categoryId?: string;
}

export interface ExpensesResponse<T> {
  data: T;
  remainingBudget: number;
}
