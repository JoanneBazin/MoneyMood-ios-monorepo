import { formatDateTitle } from "@/lib/formatDateTitle";
import { useEffect, useState } from "react";
import {
  BackArrow,
  RemainingBudgetDisplay,
  TotalCard,
  ErrorMessage,
  AnimatedView,
} from "@/components/ui";
import { MonthlyBudgetWithWeeks } from "@/types";
import { useAppStore } from "@/stores/appStore";
import {
  MonthlyBudgetOptions,
  WeeklyExpensesDisplay,
  MonthlyEntries,
} from "../budget";

type View = "app" | "charges" | "incomes";

export const CurrentBudgetLayout = ({
  budget,
}: {
  budget: MonthlyBudgetWithWeeks;
}) => {
  const setPageTitle = useAppStore((s) => s.setPageTitle);
  const dateTitle = formatDateTitle(budget.year, budget.month);
  const title = dateTitle.charAt(0).toUpperCase() + dateTitle.slice(1);
  const [view, setView] = useState<View>("app");
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const totalCharges = budget.charges.reduce(
    (acc, entry) => acc + entry.amount,
    0,
  );
  const totalIncomes = budget.incomes.reduce(
    (acc, entry) => acc + entry.amount,
    0,
  );

  useEffect(() => {
    setPageTitle(title);
  }, []);

  if (view !== "app")
    return (
      <>
        <BackArrow onBack={() => setView("app")} />
        <AnimatedView view={view}>
          <MonthlyEntries
            type={view}
            data={budget[view]}
            dateTitle={dateTitle}
            budgetId={budget.id}
          />
        </AnimatedView>
      </>
    );

  return (
    <section>
      <div className="flex-between">
        <RemainingBudgetDisplay
          type="Total budget"
          total={budget.remainingBudget}
        />
        <MonthlyBudgetOptions
          isCurrent={true}
          budgetId={budget.id}
          onError={() =>
            setBudgetError(
              "Une erreur est survenue lors de la mise à jour du budget",
            )
          }
        />
      </div>

      {budgetError && <ErrorMessage message={budgetError} />}

      <div className="flex-between my-xl">
        <TotalCard
          title="charges"
          totalData={totalCharges}
          setView={() => setView("charges")}
        />
        <TotalCard
          title="revenus"
          totalData={totalIncomes}
          setView={() => setView("incomes")}
        />
      </div>

      <WeeklyExpensesDisplay
        budgetId={budget.id}
        weeklyBudget={budget.weeklyBudget}
        expenses={budget.expenses}
      />
    </section>
  );
};
