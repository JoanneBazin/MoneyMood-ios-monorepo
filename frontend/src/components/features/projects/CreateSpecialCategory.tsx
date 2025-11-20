import { CategoryForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import { useAddSpecialCategoryMutation } from "@/hooks/queries/mutations";
import {
  CategoryFormProps,
  categorySchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";

export const CreateSpecialCategory = ({ budgetId }: { budgetId: string }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const [genericError, setGenericError] = useState<string | null>(null);
  const { mutate, isPending } = useAddSpecialCategoryMutation();

  const handleAddCategory = (category: CategoryFormProps) => {
    setValidationError(null);
    setGenericError(null);

    const validation = validateWithSchema(categorySchema, category);

    if (!validation.success) {
      setValidationError(validation.errors);
      return;
    }

    mutate(
      { category: validation.data, budgetId },
      {
        onSuccess: () => setIsCreateModalOpen(false),
        onError: () =>
          setGenericError("Une erreur est survenue lors de la création"),
      }
    );
  };
  return (
    <div className="flex-end">
      <button onClick={() => setIsCreateModalOpen(true)} className="cat-button">
        Créer une catégorie
      </button>
      {isCreateModalOpen && (
        <Modal
          isOpen={!!isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title={`Nouvelle catégorie pour ce budget`}
        >
          <CategoryForm
            validationErrors={validationError}
            genericError={genericError}
            onSubmit={handleAddCategory}
          />
        </Modal>
      )}
    </div>
  );
};
