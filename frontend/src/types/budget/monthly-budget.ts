import { Entry, MonthlyExpenseEntry } from "./entries";
import { WeekProps } from "../ui";

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
  expenses: MonthlyExpenseEntry[];
}

export interface MonthlyBudgetWithWeeks extends MonthlyBudget {
  weeksInMonth: WeekProps[];
}

export interface MonthlyBudgetOptionsProps {
  isCurrent: boolean;
  budgetId: string;
  onError: () => void;
}

// Mutations

export interface UpdateMonthlyBudgetParams {
  budgetId: string;
  isCurrent: boolean;
}
