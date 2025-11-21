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

interface BaseMonthlyEntryParams {
  type: MonthlyEntryType;
  budgetId: string;
}

export interface AddMonthlyEntriesParams extends BaseMonthlyEntryParams {
  entries: BaseEntryOutput[];
}

export interface UpdateMonthlyEntryParams extends BaseMonthlyEntryParams {
  entry: BaseEntryOutput;
  entryId: string;
}

export interface DeleteMonthlyEntryParams extends BaseMonthlyEntryParams {
  entryId: string;
}

export interface MonthlyEntryResponse<T> {
  data: T;
  weeklyBudget: number;
  remainingBudget: number;
}
