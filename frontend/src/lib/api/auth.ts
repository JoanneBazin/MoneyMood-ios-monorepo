import { LoginInput, SignupInput } from "@shared/schemas";
import { User } from "@shared/types";
import { getCurrentOnlineStatus } from "../network";
import { CONFIG } from "@/config/constants";

export const login = async ({ email, password }: LoginInput): Promise<User> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`${CONFIG.API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};

export const signup = async ({
  name,
  email,
  password,
}: SignupInput): Promise<User> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");
  const response = await fetch(`${CONFIG.API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de l'inscription");
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");
  const response = await fetch(`${CONFIG.API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la déconnexion");
  }
};

export const fetchSession = async () => {
  const response = await fetch(`${CONFIG.API_URL}/api/auth/session`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return response.json();
};
