import { fetchFixedEntries } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { Entry } from "@/types";

export const useFixedIncomesQuery = () => {
  const { isOnline } = useOfflineStatus();

  const query = useQuery<Entry[]>({
    queryKey: ["fixedIncomes"],
    queryFn: () => fetchFixedEntries("incomes"),
    enabled: isOnline,
  });

  return query;
};
