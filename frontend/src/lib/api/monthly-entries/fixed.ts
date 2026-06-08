import { BaseEntryOutput } from "@shared/schemas";
import { Entry, MonthlyEntryType } from "@/types";
import { apiFetch } from "@/lib/apiFetch";

export const fetchFixedEntries = async (
  type: MonthlyEntryType,
): Promise<Entry[]> => {
  return apiFetch(`/api/fixed-${type}`);
};

export const addFixedEntries = async (
  entries: BaseEntryOutput[],
  type: MonthlyEntryType,
): Promise<Entry[]> => {
  return apiFetch(`/api/fixed-${type}`, {
    method: "POST",
    body: JSON.stringify(entries),
  });
};

export const updateFixedEntry = async (
  entry: BaseEntryOutput,
  entryId: string,
  type: MonthlyEntryType,
): Promise<Entry> => {
  return apiFetch(`/api/fixed-${type}/${entryId}`, {
    method: "PUT",
    body: JSON.stringify(entry),
  });
};

export const deleteFixedEntry = async (
  entryId: string,
  type: MonthlyEntryType,
): Promise<{ id: string }> => {
  return apiFetch(`/api/fixed-${type}/${entryId}`, {
    method: "DELETE",
  });
};
