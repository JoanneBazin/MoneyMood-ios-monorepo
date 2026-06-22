import {
  CreateSpecialCategory,
  ProjectCategorySection,
  ProjectExpenses,
  SpecialBudgetOptions,
} from "@/components/features";
import { RemainingBudgetDisplay } from "@/components/ui";
import { usePageTitle } from "@/hooks/usePageTitle";
import { SpecialBudget } from "@/types";

export const ProjectLayout = ({ budget }: { budget: SpecialBudget }) => {
  usePageTitle(budget.name);

  return (
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
        <div data-testid="expenses-section">
          <ProjectExpenses budgetId={budget.id} expenses={budget.expenses} />
        </div>

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
  );
};
