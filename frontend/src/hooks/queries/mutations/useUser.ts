import { updateUserProfile } from "@/lib/api";
import { UpdateUserInput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: UpdateUserInput) =>
      updateUserProfile(updatedUser),
    onSuccess: async (user) => {
      queryClient.setQueryData(["session"], user);
    },
  });
};
