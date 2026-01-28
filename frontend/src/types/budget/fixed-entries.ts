import { Entry } from "./entries";
import {
  AddMonthlyEntriesParams,
  DeleteMonthlyEntryParams,
  MonthlyEntryType,
  UpdateMonthlyEntryParams,
} from "./monthly-entries";

export interface FixedEntriesDisplayProps {
  entries: Entry[];
  type: MonthlyEntryType;
}

// Mutations

export interface AddFixedEntriesParams extends Omit<
  AddMonthlyEntriesParams,
  "budgetId"
> {}
export interface UpdateFixedEntryParams extends Omit<
  UpdateMonthlyEntryParams,
  "budgetId"
> {}
export interface DeleteFixedEntryParams extends Omit<
  DeleteMonthlyEntryParams,
  "budgetId"
> {}
