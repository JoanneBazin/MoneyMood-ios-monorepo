import { CreateSpecialBudget } from "@/components/features/projects/CreateSpecialBudget";
import { Modal, SpecialBudgetCard } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Loader } from "@/components/ui/Loader";
import { useSpecialBudgetsQuery } from "@/hooks/queries";
import { useBudgetStore } from "@/stores/budgetStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const Projects = () => {
  const setPageTitle = useBudgetStore((s) => s.setPageTitle);
  const { data: specialBudgets, isPending, error } = useSpecialBudgetsQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setPageTitle("Gérer des budgets ponctuels");
  }, []);

  return (
    <section className="my-2xl">
      {isPending && <Loader type="layout" />}
      {error && <ErrorMessage message={error.message} />}

      {!isPending && !error && (
        <div>
          <div
            role="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-start gap-sm"
          >
            <Plus />
            <p>Créer un budget spécifique</p>
          </div>

          {specialBudgets && (
            <div className="my-md">
              {specialBudgets.map((budget) => (
                <SpecialBudgetCard key={budget.id} data={budget} />
              ))}
            </div>
          )}
        </div>
      )}

      {isCreateModalOpen && (
        <Modal
          isOpen={!!isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title={`Nouveau budget`}
        >
          <CreateSpecialBudget />
        </Modal>
      )}
    </section>
  );
};
