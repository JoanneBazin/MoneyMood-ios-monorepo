import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
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
      gcTime: 1000 * 60 * 60 * 24 * 7,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: "offlineFirst",
      retry: (failureCount, error) => {
        if (!navigator.onLine) return false;
        return failureCount < 1;
      },
    },
    mutations: {
      networkMode: "online",
      retry: false,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: "budget-app-cache",
});
