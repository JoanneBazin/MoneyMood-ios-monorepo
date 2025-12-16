import { fetchFixedIncomes } from "@/lib/api/fixedIncomes";
import { useQuery } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { Entry } from "@/types";

export const useFixedIncomesQuery = () => {
  const { isOnline } = useOfflineStatus();

  const query = useQuery<Entry[]>({
    queryKey: ["fixedIncomes"],
    queryFn: fetchFixedIncomes,
    enabled: isOnline,
    refetchOnWindowFocus: isOnline,
  });

  return query;
};
