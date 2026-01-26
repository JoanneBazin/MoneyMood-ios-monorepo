import { fetchFixedEntries } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useOfflineStatus } from "../useOfflineStatus";
import { Entry } from "@/types";

export const useFixedChargesQuery = () => {
  const { isOnline } = useOfflineStatus();

  const query = useQuery<Entry[]>({
    queryKey: ["fixedCharges"],
    queryFn: () => fetchFixedEntries("charges"),
    enabled: isOnline,
  });

  return query;
};
