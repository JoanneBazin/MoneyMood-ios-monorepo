import { AnimatedDropdown, DeleteModalContent, Modal } from "@/components/ui";
import { useMonthlyBudgetAction } from "@/hooks/actions";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { MonthlyBudgetOptionsProps } from "@/types";
import { CalendarFold, Settings, Trash } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const MonthlyBudgetOptions = ({
  isCurrent,
  budgetId,
  onError,
}: MonthlyBudgetOptionsProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOptionsOpen(false));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOffline } = useOfflineStatus();

  const { actions, state, status } = useMonthlyBudgetAction();

  const handleOpenModal = () => {
    actions.clearModalErrors();
    setIsModalOpen(true);
  };

  const handleUpdateBudget = () => {
    actions.updateBudgetStatus(budgetId, !isCurrent);
    setIsOptionsOpen(false);
  };

  const handleDeleteBudget = () => {
    actions.deleteMonthlyBudget(budgetId);
  };

  if (state.dashboardError) {
    onError(state.dashboardError);
  }

  return (
    <div className="budget-options" ref={dropdownRef}>
      <button
        onClick={() => setIsOptionsOpen((prev) => !prev)}
        aria-label="Options du budget"
        data-testid="budget-options-menu"
      >
        <Settings className="budget-options__icon" />
      </button>
      <AnimatePresence>
        {isOptionsOpen && (
          <AnimatedDropdown menu="options">
            <div className="budget-options__content">
              <button
                onClick={handleUpdateBudget}
                data-testid="update-budget-status"
                disabled={isOffline}
              >
                <CalendarFold size={14} className="mr-xxs" />

                <span>
                  {isCurrent
                    ? "Archiver le budget"
                    : "Définir comme budget actif"}
                </span>
              </button>
              <button
                className="red-error"
                data-testid="delete-budget-btn"
                onClick={handleOpenModal}
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Supprimer le budget"
      >
        <DeleteModalContent
          onDelete={handleDeleteBudget}
          onClose={() => setIsModalOpen(false)}
          isPending={status.isDeleting}
          reqError={state.modalError}
        />
      </Modal>
    </div>
  );
};
