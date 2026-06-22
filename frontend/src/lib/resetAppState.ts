import { QueryClient } from "@tanstack/react-query";

export const resetAppState = (queryClient: QueryClient) => {
  queryClient.clear();
  localStorage.removeItem("budget-app-cache");
};
