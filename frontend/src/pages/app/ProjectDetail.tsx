import { CreateSpecialCategory } from "@/components/features/projects/CreateSpecialCategory";
import { ProjectCategorySection } from "@/components/features/projects/ProjectCategorySection";
import { ProjectExpenses } from "@/components/features/projects/ProjectExpenses";
import { SpecialBudgetOptions } from "@/components/features/projects/SpecialBudgetOptions";
import { BackArrow, RemainingBudgetDisplay } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Loader } from "@/components/ui/Loader";
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

      {error && <ErrorMessage message={error.message} />}
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
        <SpecialBudgetOptions budgetId={budget.id} updatableData={updatable} />
        {optionsError && <ErrorMessage message={optionsError} />}
      </div>
      <div>
        <CreateSpecialCategory budgetId={budget.id} />
      </div>

      <div>
        <ProjectExpenses budgetId={budget.id} expenses={budget.expenses} />

        {budget.categories.map((cat) => (
          <ProjectCategorySection
            key={cat.id}
            budgetId={budget.id}
            category={{ name: cat.name, id: cat.id }}
          >
            <ProjectExpenses
              budgetId={budget.id}
              expenses={cat.expenses}
              categoryId={cat.id}
            />
          </ProjectCategorySection>
        ))}
      </div>
    </section>
  );
};
