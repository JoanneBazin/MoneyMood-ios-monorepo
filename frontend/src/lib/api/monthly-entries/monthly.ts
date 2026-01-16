import { ApiError } from "@/lib/ApiError";
import { getCurrentOnlineStatus } from "@/lib/network";
import { Entry, MonthlyEntryResponse, MonthlyEntryType } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";

export const addMonthlyEntries = async (
  type: MonthlyEntryType,
  entries: BaseEntryOutput[],
  budgetId: string
): Promise<MonthlyEntryResponse<Entry[]>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/${budgetId}/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(entries),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const updateMonthlyEntry = async (
  type: MonthlyEntryType,
  entry: BaseEntryOutput,
  entryId: string,
  budgetId: string
): Promise<MonthlyEntryResponse<Entry>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets/${budgetId}/${type}/${entryId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(entry),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteMonthlyEntry = async (
  type: MonthlyEntryType,
  entryId: string,
  budgetId: string
): Promise<MonthlyEntryResponse<{ id: string }>> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets/${budgetId}/${type}/${entryId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};
