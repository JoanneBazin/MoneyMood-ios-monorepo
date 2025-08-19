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
      retry: false,
      staleTime: 7 * 24 * 60 * 60 * 1000,
    },
  },
});
