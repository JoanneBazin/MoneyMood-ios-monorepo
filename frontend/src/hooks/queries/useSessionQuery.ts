import { fetchSession } from "@/lib/api/auth";
import { User } from "@shared/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";
import { resetAppState } from "@/lib/resetAppState";

export const useSessionQuery = () => {
  const { isOnline } = useOfflineStatus();
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore.getState();

  const query = useQuery<User>({
    queryKey: ["session"],
    queryFn: fetchSession,
    enabled: isOnline,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isOnline) return;

    if (query.isFetched) {
      if (query.data === null && user) {
        resetAppState(queryClient);
      } else if (query.data && !user) {
        setUser(query.data);
      }
    }
  }, [isOnline, query.isFetched, query.data, user]);

  return query;
};
