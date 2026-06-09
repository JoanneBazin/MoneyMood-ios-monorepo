import { CategoryForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import { useCategoriesAction } from "@/hooks/actions";
import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { ProjectCategorySectionProps } from "@/types";
import { CategoryEntryForm } from "@shared/schemas";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";

export const ProjectCategorySection = ({
  budgetId,
  category,
  children,
}: ProjectCategorySectionProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isOffline } = useOfflineStatus();

  const { actions, state, status } = useCategoriesAction({ budgetId });

  useEffect(() => {
    if (isEditModalOpen) {
      actions.clearModalErrors();
    }
  }, [isEditModalOpen]);

  const handleUpdateCategory = (updatedCategory: CategoryEntryForm) => {
    if (updatedCategory.name === category?.name) {
      setIsEditModalOpen(false);
      return;
    }

    actions.updateCategory(updatedCategory, category.id, () =>
      setIsEditModalOpen(false),
    );
  };

  const handleDeleteCategory = (onCascade: boolean) => {
    if (onCascade) {
      actions.deleteCategoryOnCascade(category.id, () =>
        setIsEditModalOpen(false),
      );
    } else {
      actions.deleteCategory(category.id, () => setIsEditModalOpen(false));
    }
  };

  return (
    <div data-testid="special-cat-section">
      <div className="flex-between">
        <h2 className="cat-title">{category.name}</h2>
        <button
          onClick={() => setIsEditModalOpen(true)}
          aria-label="Modifier la catégorie"
          data-testid="update-cat-btn"
          disabled={isOffline}
        >
          <Pen size={14} />
        </button>
        {isEditModalOpen && (
          <Modal
            isOpen={!!isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Modifier la catégorie`}
          >
            <CategoryForm
              validationErrors={state.updateValidationErrors}
              reqError={state.modalError}
              onResetErrors={() => actions.clearUpdateValidationErrors()}
              onSubmit={handleUpdateCategory}
              onDelete={handleDeleteCategory}
              isPending={status.isUpdating}
              initialData={category.name}
              edit={true}
            />
          </Modal>
        )}
      </div>
      {children}
    </div>
  );
};
