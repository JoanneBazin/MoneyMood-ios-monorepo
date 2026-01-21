import { ExpenseEntry } from "@/types";
import { ChevronRight, ShoppingBag } from "lucide-react";

interface ExpensesListProps<T extends ExpenseEntry> {
  data: T[];
  validateExpense: (expense: T) => void;
  setSelectedEntry?: (entry: T) => void;
  edit?: boolean;
}

export const ExpensesList = <T extends ExpenseEntry>({
  data,
  validateExpense,
  setSelectedEntry,
  edit = true,
}: ExpensesListProps<T>) => {
  return (
    <div>
      <div className="mb-xs">
        {data.length > 0 ? (
          data.map((entry, index) => (
            <div key={index} className="data-item" data-testid="data-item">
              <div
                className={`data-item__name ${entry.cashed ? "cashed" : "cursor-pointer"}`}
                onClick={() => validateExpense(entry)}
              >
                <ChevronRight size={16} />
                <p>{entry.name}</p>
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
