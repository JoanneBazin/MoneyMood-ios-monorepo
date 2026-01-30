import { ChevronRight, ShoppingBag } from "lucide-react";
import { DataListProps, Entry } from "@/types";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

export const EntriesList = <T extends Entry>({
  data,
  setSelectedEntry,
}: DataListProps<T>) => {
  const { isOffline } = useOfflineStatus();

  return (
    <>
      <div className="mb-xs">
        {data.length > 0 ? (
          data.map((entry, index) => (
            <div key={index} className="data-item" data-testid="data-item">
              <div className="data-item__name">
                <ChevronRight size={16} />
                <p>{entry.name}</p>
              </div>
              <div className="data-item__amount">
                <p className="data-item__amount__entry">
                  <span>€</span>
                  {entry.amount}
                </p>

                <button
                  className="data-item__amount__update"
                  data-testid="update-item-btn"
                  onClick={() => setSelectedEntry(entry)}
                  disabled={isOffline}
                >
                  modifier
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-data">
            <ShoppingBag className="empty-data__icon" />
            <p>
              {isOffline
                ? "Connectez-vous pour ajouter des données"
                : "Pas de données"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
