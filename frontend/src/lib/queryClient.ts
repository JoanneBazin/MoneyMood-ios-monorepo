import { QueryCache, QueryClient } from "@tanstack/react-query";
import { resetAppState } from "./resetAppState";
import { ApiError } from "./ApiError";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      if (error instanceof ApiError && error.status === 401) {
        resetAppState(queryClient);
        window.location.href = "/login";
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});
