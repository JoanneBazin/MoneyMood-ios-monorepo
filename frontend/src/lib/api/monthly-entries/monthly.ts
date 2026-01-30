import { apiFetch } from "@/lib/api";
import { Entry, MonthlyEntryResponse, MonthlyEntryType } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";

export const addMonthlyEntries = async (
  entries: BaseEntryOutput[],
  budgetId: string,
  type: MonthlyEntryType,
): Promise<MonthlyEntryResponse<Entry[]>> => {
  return apiFetch(`/api/monthly-budgets/${budgetId}/${type}`, {
    method: "POST",
    body: JSON.stringify(entries),
  });
};

export const updateMonthlyEntry = async (
  entry: BaseEntryOutput,
  entryId: string,
  budgetId: string,
  type: MonthlyEntryType,
): Promise<MonthlyEntryResponse<Entry>> => {
  return apiFetch(`/api/monthly-budgets/${budgetId}/${type}/${entryId}`, {
    method: "PUT",
    body: JSON.stringify(entry),
  });
};

export const deleteMonthlyEntry = async (
  entryId: string,
  budgetId: string,
  type: MonthlyEntryType,
): Promise<MonthlyEntryResponse<{ id: string }>> => {
  return apiFetch(`/api/monthly-budgets/${budgetId}/${type}/${entryId}`, {
    method: "DELETE",
  });
};
