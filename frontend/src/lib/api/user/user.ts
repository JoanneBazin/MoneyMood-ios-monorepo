import { getCurrentOnlineStatus } from "@/lib/network";
import { UpdateUserInput } from "@shared/schemas";
import { User } from "@shared/types";

export const updateUserProfile = async (
  updatedUser: UpdateUserInput,
): Promise<User> => {
  if (!getCurrentOnlineStatus()) throw new Error("Vous êtes hors ligne");

  const response = await fetch(`/api/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Echec de la connexion");
  }

  return response.json();
};
