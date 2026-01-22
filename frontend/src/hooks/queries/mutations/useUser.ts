import { updateUserProfile } from "@/lib/api";
import { useAppStore } from "@/stores/appStore";
import { UpdateUserInput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAppStore.getState();

  return useMutation({
    mutationFn: (updatedUser: UpdateUserInput) =>
      updateUserProfile(updatedUser),
    onSuccess: async (user) => {
      setUser(user);
      queryClient.setQueryData(["session"], user);
    },
  });
};
