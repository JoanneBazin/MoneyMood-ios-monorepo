import { fetchSession } from "@/lib/api";
import { User } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";

export const useSessionQuery = () => {
  const { isOnline } = useOfflineStatus();

  const query = useQuery<User | null>({
    queryKey: ["session"],
    queryFn: fetchSession,
    enabled: isOnline,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
