import { CategoryForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import { useCategoriesAction } from "@/hooks/actions";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { CategoryEntryForm } from "@shared/schemas";
import { useState } from "react";

export const CreateSpecialCategory = ({ budgetId }: { budgetId: string }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isOffline } = useOfflineStatus();
  const { actions, state, status } = useCategoriesAction({ budgetId });

  const handleOpenModal = () => {
    actions.clearModalErrors();
    setIsCreateModalOpen(true);
  };

  const handleAddCategory = (category: CategoryEntryForm) => {
    actions.addCategory(category, () => setIsCreateModalOpen(false));
  };

  return (
    <div className="flex-end">
      <button
        onClick={handleOpenModal}
        className="cat-button"
        data-testid="add-special-cat-btn"
        disabled={isOffline}
      >
        Créer une catégorie
      </button>
      {isCreateModalOpen && (
        <Modal
          isOpen={!!isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title={`Nouvelle catégorie pour ce budget`}
        >
          <CategoryForm
            validationErrors={state.addValidationErrors}
            reqError={state.modalError}
            onResetErrors={() => actions.clearAddValidationErrors()}
            onSubmit={handleAddCategory}
            isPending={status.isAdding}
          />
        </Modal>
      )}
    </div>
  );
};
