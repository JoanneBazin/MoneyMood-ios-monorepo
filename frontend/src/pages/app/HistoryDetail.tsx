import {
  MonthlyBudgetOptions,
  WeeklyExpensesDisplay,
} from "@/components/features";
import {
  BackArrow,
  Collapse,
  RemainingBudgetDisplay,
  ErrorMessage,
  Loader,
} from "@/components/ui";
import { useHistoryDetailsQuery } from "@/hooks/queries";
import { formatDateTitle } from "@/lib/formatDateTitle";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const HistoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate(`/app/history`);
    return;
  }

  const { data: budget, isPending, error } = useHistoryDetailsQuery(id);
  const [mutationError, setMutationError] = useState<string | null>(null);

  if (isPending) {
    return (
      <section>
        <Loader type="layout" />
      </section>
    );
  }

  return (
    <section>
      <BackArrow />
      {error && (
        <ErrorMessage message="Erreur lors de la récupération des données" />
      )}
      {budget ? (
        <>
          <div className="flex-between">
            <RemainingBudgetDisplay
              type={`Total ${formatDateTitle(budget.year, budget.month)}`}
              total={budget.remainingBudget ?? 0}
            />
            <MonthlyBudgetOptions
              budgetId={id}
              isCurrent={false}
              onError={() =>
                setMutationError(
                  "Une erreur est survenue lors de la mise à jour du budget",
                )
              }
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
        </>
      ) : null}
    </section>
  );
};
