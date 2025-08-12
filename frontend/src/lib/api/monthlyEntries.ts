import {
  AddMonthlyEntriesProps,
  DeleteMonthlyEntryProps,
  UpdateMonthlyEntryProps,
} from "@/types";
import { getCurrentOnlineStatus } from "../network";

export const addMonthlyEntries = async ({
  type,
  entries,
  budgetId,
}: AddMonthlyEntriesProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/monthly-budgets/${budgetId}/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(entries),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    updated:
      type === "charges"
        ? { charges: result.charges }
        : { incomes: result.incomes },
    remainingBudget: result.remainingBudget,
    weeklyBudget: result.weeklyBudget,
  };
};

export const updateMonthlyEntry = async ({
  type,
  entry,
  budgetId,
}: UpdateMonthlyEntryProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets/${budgetId}/${type}/${entry.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(entry),
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    updated:
      type === "charges"
        ? { charge: result.updatedCharge }
        : { income: result.updatedIncome },
    remainingBudget: result.remainingBudget,
    weeklyBudget: result.weeklyBudget,
  };
};

export const deleteMonthlyEntry = async ({
  type,
  entryId,
  budgetId,
}: DeleteMonthlyEntryProps) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(
    `/api/monthly-budgets/${budgetId}/${type}/${entryId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    updated: type === "charges" ? { chargeId: entryId } : { incomeId: entryId },
    remainingBudget: result.remainingBudget,
    weeklyBudget: result.weeklyBudget,
  };
};
