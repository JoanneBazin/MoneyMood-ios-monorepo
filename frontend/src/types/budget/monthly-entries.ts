import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";

export interface MonthlyEntriesView {
  type: string;
  data: BudgetEntry[];
  dateTitle: string;
  budgetId: string;
}

export interface AddMonthlyEntriesProps {
  type: "charges" | "incomes";
  budgetId: string;
  entries: BudgetEntryForm[];
}

export interface UpdateMonthlyEntryProps {
  type: "charges" | "incomes";
  budgetId: string;
  entry: BudgetEntry;
}

export interface DeleteMonthlyEntryProps {
  type: "charges" | "incomes";
  budgetId: string;
  entryId: string;
}
