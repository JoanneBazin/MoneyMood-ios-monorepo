import { ExpenseEntryForm } from "@shared/schemas";
import { ExpenseEntry, UpdateExpenseEntry } from "./entries";

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

export interface AddExpensesProps {
  budgetId: string;
  expenses: ExpenseEntryForm[];
}

export interface UpdateExpenseProps {
  expense: UpdateExpenseEntry;
  budgetId: string;
}
export interface DeleteExpenseProps {
  expenseId: string;
  budgetId: string;
}
