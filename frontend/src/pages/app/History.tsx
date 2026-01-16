import { useEffect, useState } from "react";
import { getBudgetByDate } from "@/lib/api";
import { Search } from "lucide-react";
import { useLastBudgetsQuery } from "@/hooks/queries";
import { HistoryCard, MonthYearPicker } from "@/components/ui";
import { LastMonthlyBudget } from "@/types";
import { Loader } from "@/components/ui/Loader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { ApiError } from "@/lib/ApiError";
import { useAppStore } from "@/stores/appStore";

export const History = () => {
  const { data: lastBudgets, isPending, error } = useLastBudgetsQuery();
  const { isOffline } = useOfflineStatus();
  const setPageTitle = useAppStore((s) => s.setPageTitle);

  const [searchedBudget, setSearchedBudget] =
    useState<LastMonthlyBudget | null>(null);

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle("Historique des budgets mensuels");
  }, []);

  const handleDateChange = async (month: number, year: number) => {
    try {
      setIsSearchLoading(true);
      setSearchError(null);
      setSearchedBudget(null);
      const data = await getBudgetByDate(year, month);
      setSearchedBudget(data);
    } catch (error) {
      setSearchError(
        error instanceof ApiError
          ? error.message
          : "Erreur lors de la recherche"
      );
    } finally {
      setIsSearchLoading(false);
    }
  };

  if (isOffline)
    return (
      <ErrorMessage message="Vous êtes hors ligne. Veuillez vous reconnecter pour accéder à l'historique des budgets." />
    );

  return (
    <section>
      <div className="date-picker-container">
        <p>Rechercher par mois</p>
        <MonthYearPicker onChange={handleDateChange} defaultInput={false} />
      </div>

      {searchError && (
        <div className="search-error">
          <Search size={18} />
          <p className="search-error__text">{searchError}</p>
        </div>
      )}

      {isSearchLoading && <Loader type="datalist" />}

      {searchedBudget && (
        <div className="selected-budget-card">
          <HistoryCard data={searchedBudget} />
        </div>
      )}

      {isPending && <Loader type="layout" />}
      {error && <ErrorMessage message={error.message} />}

      <div className="my-2xl">
        {lastBudgets &&
          lastBudgets.map((budget) => (
            <HistoryCard key={budget.id} data={budget} />
          ))}
      </div>
    </section>
  );
};
