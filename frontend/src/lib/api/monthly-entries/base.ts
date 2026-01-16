import { ApiError } from "@/lib/ApiError";
import { getCurrentOnlineStatus } from "@/lib/network";
import { Entry, MonthlyEntryType } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";

export const getFixedEntries = async (
  type: MonthlyEntryType
): Promise<Entry[]> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

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
  type: MonthlyEntryType
): Promise<Entry[]> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-${type}`, {
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

export const updateFixedEntry = async (
  entry: BaseEntryOutput,
  entryId: string,
  type: MonthlyEntryType
): Promise<Entry> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-${type}/${entryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteFixedEntry = async (
  entryId: string,
  type: MonthlyEntryType
): Promise<{ id: string }> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-${type}/${entryId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};
