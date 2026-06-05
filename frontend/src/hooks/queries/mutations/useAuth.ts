import { login, logout, signup } from "@/lib/api";
import { resetAppState } from "@/lib/resetAppState";
import { LoginInput, SignupInput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginInput) => login({ email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email, password }: SignupInput) =>
      signup({ name, email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      resetAppState(queryClient);
    },
  });
};
