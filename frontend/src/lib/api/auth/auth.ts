import { ApiError } from "@/lib/ApiError";
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

export const fetchSession = async (): Promise<User | null> => {
  try {
    const response = await fetch(`/api/auth/session`, {
      credentials: "include",
    });

    if (response.status === 401) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    if (!response.ok) {
      const data = isJson ? await response.json() : null;
      throw new ApiError(
        response.status,
        data?.error || "Une erreur interne est survenue",
      );
    }

    if (!isJson) {
      throw new Error("Réponse du serveur invalide");
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Une erreur interne est survenue");
  }
};
