import { ProjectExpenses } from "@/components/features/projects/ProjectExpenses";
import { SpecialBudgetOptions } from "@/components/features/projects/SpecialBudgetOptions";
import { BackArrow, RemainingBudgetDisplay } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useBudgetDetailsQuery } from "@/hooks/queries";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [optionsError, setOptionsError] = useState<string | null>(null);
  if (!id) {
    navigate(`/app/projects`);
    return;
  }
  const { data: budget, isPending, error } = useBudgetDetailsQuery(id);
  if (!budget) return;

  const updatable = { name: budget.name, totalBudget: budget.totalBudget };

  return (
    <section>
      <BackArrow />

      <div className="flex-between">
        <RemainingBudgetDisplay
          type="Budget restant"
          total={budget.remainingBudget}
        />
        <RemainingBudgetDisplay
          type="Budget initial"
          total={budget.totalBudget}
          base={true}
        />
        <SpecialBudgetOptions
          budgetId={budget.id}
          updatableData={updatable}
          onError={() =>
            setOptionsError("Une erreur est survenue lors de la mise à jour")
          }
        />
        {optionsError && <ErrorMessage message={optionsError} />}
      </div>
      <ProjectExpenses budgetId={budget.id} expenses={budget.expenses} />
    </section>
  );
};
