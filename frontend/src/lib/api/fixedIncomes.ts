import { BaseEntryOutput } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";
import { ApiError } from "../ApiError";
import { Entry } from "@/types";

export const fetchFixedIncomes = async (): Promise<Entry[]> => {
  const response = await fetch(`/api/fixed-incomes`, {
    credentials: "include",
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(
      response.status,
      data.error || "Revenus fixes indisponibles"
    );
  }
  return response.json();
};

export const addFixedIncomes = async (
  incomes: BaseEntryOutput[]
): Promise<Entry[]> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-incomes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(incomes),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const updateFixedIncome = async (
  income: BaseEntryOutput,
  incomeId: string
) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-incomes/${incomeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(income),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteFixedIncomes = async (
  incomeId: string
): Promise<{ id: string }> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-incomes/${incomeId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};
