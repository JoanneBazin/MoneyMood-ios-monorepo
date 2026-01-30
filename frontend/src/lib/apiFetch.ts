import { ApiError } from "./ApiError";

export const apiFetch = async (url: string, options?: RequestInit) => {
  if (!navigator.onLine) {
    throw new Error("Connexion internet indisponible");
  }

  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new ApiError(
      response.status,
      data.error || "Une erreur interne est survenue",
    );
  }
  return response.json();
};
