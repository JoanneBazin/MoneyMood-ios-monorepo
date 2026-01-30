import {
  CreateSpecialCategory,
  ProjectCategorySection,
  ProjectExpenses,
  SpecialBudgetOptions,
} from "@/components/features";
import {
  BackArrow,
  RemainingBudgetDisplay,
  Loader,
  OfflineEmptyState,
} from "@/components/ui";
import { useBudgetDetailsQuery } from "@/hooks/queries";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate(`/app/projects`);
    return;
  }
  const { data: budget, isPending, error } = useBudgetDetailsQuery(id);

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
        <OfflineEmptyState
          error={error.message ?? "Erreur lors de la récupération des données"}
        />
      )}
      {budget && (
        <div>
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
              updatableData={{
                name: budget.name,
                totalBudget: budget.totalBudget,
              }}
            />
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
        </div>
      )}
    </section>
  );
};
