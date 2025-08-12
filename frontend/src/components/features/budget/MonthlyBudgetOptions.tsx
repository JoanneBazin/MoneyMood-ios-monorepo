import { Modal } from "@/components/ui";
import { AnimatedDropdown } from "@/components/ui/AnimateDropdown";
import {
  useDeleteMonthlyBudgetMutation,
  useUpdateBudgetStatusMutation,
} from "@/hooks/queries/mutations";
import { useClickOutside } from "@/hooks/useClickOutside";
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

  const updateBudgetStatus = useUpdateBudgetStatusMutation();
  const deleteMonthlyBudget = useDeleteMonthlyBudgetMutation();

  const handleUpdateBudget = () => {
    updateBudgetStatus.mutate(
      { budgetId, isCurrent: !isCurrent },
      {
        onError: () => {
          setIsOptionsOpen(false);
          onError();
        },
      }
    );
  };

  const handleDeleteBudget = () => {
    deleteMonthlyBudget.mutate(budgetId, {
      onError: () => {
        setIsOptionsOpen(false);
        onError();
      },
    });
  };

  return (
    <div className="budget-options" ref={dropdownRef}>
      <button
        onClick={() => setIsOptionsOpen((prev) => !prev)}
        aria-label="Options du budget"
      >
        <Settings className="budget-options__icon" />
      </button>
      <AnimatePresence>
        {isOptionsOpen && (
          <AnimatedDropdown menu="options">
            <div className="budget-options__content">
              <button onClick={handleUpdateBudget}>
                <CalendarFold size={14} className="mr-xxs" />

                <span>
                  {isCurrent
                    ? "Archiver le budget"
                    : "Définir comme budget actif"}
                </span>
              </button>
              <button
                className="red-error"
                onClick={() => setIsModalOpen(true)}
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
        <p className="req-info">
          Voulez-vous supprimer définitivement ce budget ?
        </p>
        <div className="flex-end my-md">
          <button onClick={handleDeleteBudget} className="primary-btn">
            Supprimer
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="secondary-btn"
          >
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
};
