import { BaseEntryOutput } from "@shared/schemas";
import { Entry, MonthlyEntryType } from "@/types";
import { ApiError } from "@/lib/ApiError";
import { apiFetch } from "@/lib/api";

export const fetchFixedEntries = async (
  type: MonthlyEntryType,
): Promise<Entry[]> => {
  const response = await fetch(`/api/fixed-${type}`, {
    credentials: "include",
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Données indisponibles");
  }
  return response.json();
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
