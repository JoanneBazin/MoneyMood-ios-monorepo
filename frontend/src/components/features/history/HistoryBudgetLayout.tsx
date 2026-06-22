import {
  MonthlyBudgetOptions,
  WeeklyExpensesDisplay,
} from "@/components/features";
import {
  Collapse,
  RemainingBudgetDisplay,
  ErrorMessage,
} from "@/components/ui";
import { usePageTitle } from "@/hooks/usePageTitle";
import { formatDateTitle } from "@/lib/formatDateTitle";
import { MonthlyBudget } from "@/types";
import { useState } from "react";

export const HistoryBudgetLayout = ({ budget }: { budget: MonthlyBudget }) => {
  const [mutationError, setMutationError] = useState<string | null>(null);
  const dateTitle = formatDateTitle(budget.year, budget.month);
  usePageTitle(`Historique - ${dateTitle}`);

  return (
    <div>
      <div className="flex-between">
        <RemainingBudgetDisplay
          type={`Total restant`}
          total={budget.remainingBudget ?? 0}
        />
        <MonthlyBudgetOptions
          budgetId={budget.id}
          isCurrent={false}
          onError={(reqError) => setMutationError(reqError)}
        />
      </div>
      {mutationError && <ErrorMessage message={mutationError} />}

      <div className="flex-start gap-sm my-md">
        <Collapse data={budget.charges} title="Charges" color="black" />
        <Collapse data={budget.incomes} title="Revenus" color="primary" />
      </div>

      <WeeklyExpensesDisplay
        budgetId={budget.id}
        weeklyBudget={budget.weeklyBudget}
        expenses={budget.expenses}
        edit={false}
        oldDate={{ year: budget.year, month: budget.month }}
      />
    </div>
  );
};
