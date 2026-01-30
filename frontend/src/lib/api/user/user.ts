import { apiFetch } from "@/lib/api";
import { UpdateUserInput } from "@shared/schemas";
import { User } from "@shared/types";

export const updateUserProfile = async (
  updatedUser: UpdateUserInput,
): Promise<User> => {
  return apiFetch(`/api/users/me`, {
    method: "PATCH",
    body: JSON.stringify(updatedUser),
  });
};
