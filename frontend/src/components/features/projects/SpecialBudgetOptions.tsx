import { ProjectForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import { AnimatedDropdown } from "@/components/ui/AnimateDropdown";
import { DeleteModalContent } from "@/components/ui/DeleteModalContent";
import {
  useDeleteSpecialBudgetMutation,
  useUpdateSpecialBudgetMutation,
} from "@/hooks/queries/mutations";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SpecialBudgetOptionsProps } from "@/types";
import { SpecialBudgetForm } from "@shared/schemas";
import { Edit, Settings, Trash } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SpecialBudgetOptions = ({
  budgetId,
  updatableData,
}: SpecialBudgetOptionsProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOptionsOpen(false));
  const [selectedAction, setSelectedAction] = useState<
    "edit" | "delete" | null
  >(null);

  const updateSpecialBudget = useUpdateSpecialBudgetMutation();
  const deleteSpecialBudget = useDeleteSpecialBudgetMutation();
  const navigate = useNavigate();

  const handleUpdateBudget = (budget: SpecialBudgetForm) => {
    if (
      budget.name === updatableData?.name &&
      budget.totalBudget === updatableData.totalBudget
    ) {
      setSelectedAction(null);
      return;
    }

    updateSpecialBudget.mutate(
      { budget, budgetId },
      {
        onSuccess: () => {
          setSelectedAction(null);
        },
      }
    );
  };

  const handleDeleteBudget = () => {
    deleteSpecialBudget.mutate(budgetId, {
      onSuccess: () => {
        navigate("/app/projects");
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
              <button onClick={() => setSelectedAction("edit")}>
                <Edit size={14} className="mr-xxs" />

                <span>Modifier le budget</span>
              </button>
              <button
                className="red-error"
                onClick={() => setSelectedAction("delete")}
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
            isPending={updateSpecialBudget.isPending}
            isError={updateSpecialBudget.isError}
            edit={true}
            initialData={updatableData}
          />
        )}

        {selectedAction === "delete" && (
          <DeleteModalContent
            onDelete={handleDeleteBudget}
            onClose={() => setSelectedAction(null)}
            isPending={deleteSpecialBudget.isPending}
            isError={deleteSpecialBudget.isError}
          />
        )}
      </Modal>
    </div>
  );
};
