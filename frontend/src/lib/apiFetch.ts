import { ApiError } from "./ApiError";

export const apiFetch = async (url: string, options?: RequestInit) => {
  if (!navigator.onLine) {
    throw new Error("Connexion internet indisponible");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
      credentials: "include",
    });

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
