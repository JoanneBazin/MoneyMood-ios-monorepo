import { ProjectForm } from "@/components/forms";
import { AnimatedDropdown, DeleteModalContent, Modal } from "@/components/ui";
import { useSpecialBudgetAction } from "@/hooks/actions";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { SpecialBudgetOptionsProps } from "@/types";
import { SpecialBudgetForm } from "@shared/schemas";
import { Edit, Settings, Trash } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const SpecialBudgetOptions = ({
  budgetId,
  updatableData,
}: SpecialBudgetOptionsProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOptionsOpen(false));
  const [selectedAction, setSelectedAction] = useState<
    "edit" | "delete" | null
  >(null);

  const { actions, state, status } = useSpecialBudgetAction();

  const { isOffline } = useOfflineStatus();

  const handleOpenModal = (action: "edit" | "delete") => {
    actions.clearModalErrors();
    setSelectedAction(action);
  };

  const handleUpdateBudget = (budget: SpecialBudgetForm) => {
    if (
      budget.name === updatableData?.name &&
      budget.totalBudget === updatableData.totalBudget
    ) {
      setSelectedAction(null);
      return;
    }

    actions.updateSpecialBudget(budget, budgetId, () =>
      setSelectedAction(null),
    );
  };

  const handleDeleteBudget = () => {
    actions.deleteSpecialBudget(budgetId, () => setSelectedAction(null));
  };

  return (
    <div className="budget-options" ref={dropdownRef}>
      <button
        onClick={() => setIsOptionsOpen((prev) => !prev)}
        aria-label="Options du budget"
        data-testid="special-budget-options"
      >
        <Settings className="budget-options__icon" />
      </button>
      <AnimatePresence>
        {isOptionsOpen && (
          <AnimatedDropdown menu="options">
            <div className="budget-options__content">
              <button
                onClick={() => handleOpenModal("edit")}
                data-testid="update-special-budget-btn"
                disabled={isOffline}
              >
                <Edit size={14} className="mr-xxs" />

                <span>Modifier le budget</span>
              </button>
              <button
                className="red-error"
                onClick={() => handleOpenModal("delete")}
                data-testid="delete-special-budget-btn"
                disabled={isOffline}
              >
                <Trash size={14} className="mr-xxs" />
                <span>Supprimer le budget</span>
              </button>
            </div>
          </AnimatedDropdown>
        )}
      </AnimatePresence>

      <Modal
        isOpen={!!selectedAction}
        onClose={() => setSelectedAction(null)}
        title={
          selectedAction === "edit"
            ? "Modifier le budget"
            : "Supprimer le budget"
        }
      >
        {selectedAction === "edit" && (
          <ProjectForm
            onSubmit={handleUpdateBudget}
            isPending={status.isUpdating}
            validationErrors={state.updateValidationErrors}
            reqError={state.modalError}
            onResetErrors={() => actions.clearUpdateValidationErrors()}
            edit={true}
            initialData={updatableData}
          />
        )}

        {selectedAction === "delete" && (
          <DeleteModalContent
            onDelete={handleDeleteBudget}
            onClose={() => setSelectedAction(null)}
            isPending={status.isDeleting}
            reqError={state.modalError}
          />
        )}
      </Modal>
    </div>
  );
};
