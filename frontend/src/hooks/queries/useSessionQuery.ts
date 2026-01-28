import { fetchSession } from "@/lib/api";
import { User } from "@shared/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";
import { resetAppState } from "@/lib/resetAppState";

export const useSessionQuery = () => {
  const { isOnline } = useOfflineStatus();
  const queryClient = useQueryClient();
  const { user, setUser } = useAppStore.getState();

  const query = useQuery<User>({
    queryKey: ["session"],
    queryFn: fetchSession,
    enabled: isOnline,
  });

  useEffect(() => {
    if (!isOnline || !query.isFetched) return;

    if (query.data === null && user) {
      resetAppState(queryClient);
      return;
    }

    if (query.data && query.data.id !== user?.id) {
      setUser(query.data);
    }
  }, [isOnline, query.isFetched, query.data, user]);

  return query;
};
