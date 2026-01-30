import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { ExpenseEntry, ExpensesListProps } from "@/types";
import { ChevronRight, ShoppingBag } from "lucide-react";

export const ExpensesList = <T extends ExpenseEntry>({
  data,
  enabledExpenseValidation,
  validateExpense,
  setSelectedEntry,
  edit = true,
}: ExpensesListProps<T>) => {
  const { isOffline } = useOfflineStatus();

  return (
    <div>
      <div className="mb-xs">
        {data.length > 0 ? (
          data.map((entry, index) => (
            <div key={index} className="data-item" data-testid="data-item">
              <div
                className={`data-item__name ${enabledExpenseValidation && entry.cashed ? "cashed" : ""}`}
                data-testid="data-item-name"
              >
                <ChevronRight size={16} />
                <p
                  className={
                    enabledExpenseValidation && !isOffline
                      ? "cursor-pointer"
                      : ""
                  }
                  onClick={() => validateExpense(entry)}
                >
                  {entry.name}
                </p>
              </div>
              <div className="data-item__amount">
                <p className="data-item__amount__entry">
                  <span>€</span>
                  {entry.amount}
                </p>
                {setSelectedEntry && edit && (
                  <button
                    className="data-item__amount__update"
                    data-testid="update-item-btn"
                    onClick={() => setSelectedEntry(entry)}
                    disabled={isOffline}
                  >
                    modifier
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-data">
            <ShoppingBag className="empty-data__icon" />
            <p>Pas de dépenses</p>
          </div>
        )}
      </div>
    </div>
  );
};
