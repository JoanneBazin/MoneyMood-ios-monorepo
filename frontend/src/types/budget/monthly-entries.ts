import { BaseEntryOutput } from "@shared/schemas";
import { Entry } from "./entries";

export type MonthlyEntryType = "charges" | "incomes";

export interface MonthlyEntriesView {
  type: MonthlyEntryType;
  data: Entry[];
  dateTitle: string;
  budgetId: string;
}

// Mutations

export interface AddMonthlyEntriesParams {
  type: MonthlyEntryType;
  budgetId: string;
  entries: BaseEntryOutput[];
}

export interface UpdateMonthlyEntryParams {
  type: MonthlyEntryType;
  entry: BaseEntryOutput;
  entryId: string;
  budgetId: string;
}

export interface DeleteMonthlyEntryParams {
  type: MonthlyEntryType;
  entryId: string;
  budgetId: string;
}

export interface MonthlyEntryResponse<T> {
  data: T;
  weeklyBudget: number;
  remainingBudget: number;
}
