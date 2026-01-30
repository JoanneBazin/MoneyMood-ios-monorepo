import { CreateSpecialBudget } from "@/components/features";
import {
  Modal,
  SpecialBudgetCard,
  Loader,
  OfflineEmptyState,
} from "@/components/ui";
import { useSpecialBudgetsQuery } from "@/hooks/queries";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { useAppStore } from "@/stores/appStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const Projects = () => {
  const setPageTitle = useAppStore((s) => s.setPageTitle);
  const { data: specialBudgets, isPending, error } = useSpecialBudgetsQuery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isOffline } = useOfflineStatus();

  useEffect(() => {
    setPageTitle("Gérer des budgets ponctuels");
  }, []);

  return (
    <section className="my-2xl">
      {isPending && <Loader type="layout" />}
      {error && <OfflineEmptyState error={error.message} />}

      {!isPending && !error && (
        <div>
          {!isOffline && (
            <div
              role="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-start gap-sm"
              data-testid="create-project-btn"
            >
              <Plus />
              <p>Créer un budget spécifique</p>
            </div>
          )}

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
