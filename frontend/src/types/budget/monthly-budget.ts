import { Entry, ExpenseEntry } from "./entries";

export interface MonthlyBudget {
  id: string;
  month: number;
  year: number;
  isCurrent: boolean;
  remainingBudget: number;
  weeklyBudget: number;
  numberOfWeeks: number;
  incomes: Entry[];
  charges: Entry[];
  expenses: ExpenseEntry[];
}

export interface MonthlyBudgetOptionsProps {
  isCurrent: boolean;
  budgetId: string;
  onError: () => void;
}

export interface updateMonthlyBudgetProps {
  budgetId: string;
  isCurrent: boolean;
}
