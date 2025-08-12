import { useBudgetStore } from "@/stores/budgetStore";
import { useEffect, useState } from "react";
import { getBudgetByDate } from "@/lib/api/monthlyBudgets";
import { Search } from "lucide-react";
import { LastBudgetLayout } from "@/components/features/history/LastBudgetLayout";
import { useLastBudgetsQuery } from "@/hooks/queries";
import { BackArrow, HistoryCard, MonthYearPicker } from "@/components/ui";
import { LastMonthlyBudget } from "@/types";
import { Loader } from "@/components/ui/Loader";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { AnimatedView } from "@/components/ui/AnimatedView";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";

export const History = () => {
  const { data: lastBudgets, isPending, error } = useLastBudgetsQuery();
  const { isOffline } = useOfflineStatus();
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);

  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
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
        error instanceof Error ? error.message : "Erreur lors de la recherche"
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
      {selectedBudget ? (
        <>
          <BackArrow onBack={() => setSelectedBudget(null)} />
          <AnimatedView view="last-budget">
            <LastBudgetLayout budgetId={selectedBudget} />
          </AnimatedView>
        </>
      ) : (
        <>
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
              <HistoryCard data={searchedBudget} onSelect={setSelectedBudget} />
            </div>
          )}

          {isPending && <Loader type="layout" />}
          {error && <ErrorMessage message={error.message} />}

          <div className="my-2xl">
            {lastBudgets &&
              lastBudgets.map((budget) => (
                <HistoryCard
                  key={budget.id}
                  data={budget}
                  onSelect={setSelectedBudget}
                />
              ))}
          </div>
        </>
      )}
    </section>
  );
};
