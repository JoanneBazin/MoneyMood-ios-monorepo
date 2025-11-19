import { CategoryForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import {
  useDeleteSpecialCategoryMutation,
  useUpdateSpecialCategoryMutation,
} from "@/hooks/queries/mutations";
import { ProjectCategorySectionProps } from "@/types";
import { updateCategorySchema, validateWithSchema } from "@shared/schemas";
import { Pen } from "lucide-react";
import { useState } from "react";

export const ProjectCategorySection = ({
  budgetId,
  category,
  children,
}: ProjectCategorySectionProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<Record<
    string,
    string
  > | null>(null);

  const updateCategory = useUpdateSpecialCategoryMutation();
  const deleteCategory = useDeleteSpecialCategoryMutation();

  const handleUpdateCategory = (categoryName: { name: string }) => {
    setValidationError(null);
    setGenericError(null);
    const updatedCategory = { ...categoryName, id: category.id };

    const validation = validateWithSchema(
      updateCategorySchema,
      updatedCategory
    );

    if (!validation.success) {
      setValidationError(validation.errors);
      return;
    }
    updateCategory.mutate(
      {
        category: validation.data,
        budgetId,
      },
      {
        onSuccess: () => setIsEditModalOpen(false),
        onError: () =>
          setGenericError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  const handleDeleteCategory = () => {
    setValidationError(null);
    setGenericError(null);

    deleteCategory.mutate(
      {
        category,
        budgetId,
      },
      {
        onSuccess: () => setIsEditModalOpen(false),
        onError: () =>
          setGenericError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  return (
    <div>
      <div className="flex-between">
        <h3>{category.name}</h3>
        <button onClick={() => setIsEditModalOpen(true)}>
          <Pen size={14} />
        </button>
        {isEditModalOpen && (
          <Modal
            isOpen={!!isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Modifier la catégorie`}
          >
            <CategoryForm
              validationErrors={validationError}
              genericError={genericError}
              onSubmit={handleUpdateCategory}
              onDelete={handleDeleteCategory}
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
