import { BaseEntryOutput } from "@shared/schemas";
import { getCurrentOnlineStatus } from "../network";
import { ApiError } from "../ApiError";
import { Entry } from "@/types";

export const fetchFixedCharges = async (): Promise<Entry[]> => {
  const response = await fetch(`/api/fixed-charges`, {
    credentials: "include",
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(
      response.status,
      data.error || "Charges fixes indisponibles"
    );
  }

  return response.json();
};

export const addFixedCharges = async (
  charges: BaseEntryOutput[]
): Promise<Entry[]> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-charges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(charges),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const updateFixedCharge = async (
  charge: BaseEntryOutput,
  chargeId: string
) => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");
  const response = await fetch(`/api/fixed-charges/${chargeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(charge),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};

export const deleteFixedCharges = async (
  chargeId: string
): Promise<{ id: string }> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/fixed-charges/${chargeId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(response.status, data.error || "Echec de la connexion");
  }

  return response.json();
};
