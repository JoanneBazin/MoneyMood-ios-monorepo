import { useAppStore } from "@/stores/appStore";
import { QueryClient } from "@tanstack/react-query";

export const resetAppState = (queryClient: QueryClient) => {
  useAppStore.getState().clearUser();

  queryClient.removeQueries();
};
