import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";

export const fetchFixedCharges = async () => {
  const response = await fetch(`/api/fixed-charges`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Charges fixes indisponibles");

  return response.json();
};

export const addFixedCharges = async (charges: BudgetEntryForm[]) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-charges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(charges),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const updateFixedCharge = async (charge: BudgetEntry) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");
  const response = await fetch(`/api/fixed-charges/${charge.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(charge),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteFixedCharges = async (chargeId: string) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-charges/${chargeId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  const result = await response.json();

  return {
    chargeId,
  };
};
