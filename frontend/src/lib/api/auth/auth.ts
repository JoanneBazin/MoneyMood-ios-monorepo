import { apiFetch } from "@/lib/apiFetch";
import { LoginInput, SignupInput } from "@shared/schemas";
import { User } from "@shared/types";

export const login = async ({ email, password }: LoginInput): Promise<User> => {
  return apiFetch(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signup = async ({
  name,
  email,
  password,
}: SignupInput): Promise<User> => {
  return apiFetch(`/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
};

export const logout = async (): Promise<void> => {
  return apiFetch(`/api/auth/logout`, {
    method: "POST",
  });
};

export const fetchSession = async () => {
  const response = await fetch(`/api/auth/session`, {
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
