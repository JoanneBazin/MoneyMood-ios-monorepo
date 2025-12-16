import { CategoryForm } from "@/components/forms";
import { Modal } from "@/components/ui";
import {
  useDeleteSpecialCategorOnCascadeyMutation,
  useDeleteSpecialCategoryMutation,
  useUpdateSpecialCategoryMutation,
} from "@/hooks/queries/mutations";
import { ProjectCategorySectionProps } from "@/types";
import {
  CategoryEntryForm,
  categorySchema,
  validateWithSchema,
} from "@shared/schemas";
import { Pen } from "lucide-react";
import { useState } from "react";

export const ProjectCategorySection = ({
  budgetId,
  category,
  children,
}: ProjectCategorySectionProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<Record<
    string,
    string
  > | null>(null);

  const updateCategory = useUpdateSpecialCategoryMutation();
  const deleteCategory = useDeleteSpecialCategoryMutation();
  const deleteCategoryOnCascade = useDeleteSpecialCategorOnCascadeyMutation();

  const handleUpdateCategory = (updatedCategory: CategoryEntryForm) => {
    setValidationError(null);
    setRequestError(null);

    const { data, success, errors } = validateWithSchema(
      categorySchema,
      updatedCategory
    );

    if (!success) {
      setValidationError(errors);
      return;
    }

    if (data.name === category?.name) {
      setIsEditModalOpen(false);
      return;
    }

    updateCategory.mutate(
      {
        category: data,
        categoryId: category.id,
        budgetId,
      },
      {
        onSuccess: () => setIsEditModalOpen(false),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  const handleDeleteCategory = (onCascade: boolean) => {
    setValidationError(null);
    setRequestError(null);

    if (onCascade) {
      deleteCategoryOnCascade.mutate(
        {
          categoryId: category.id,
          budgetId,
        },
        {
          onSuccess: () => setIsEditModalOpen(false),
          onError: () =>
            setRequestError("Une erreur est survenue lors de la mise à jour"),
        }
      );
    } else {
      deleteCategory.mutate(
        {
          categoryId: category.id,
          budgetId,
        },
        {
          onSuccess: () => setIsEditModalOpen(false),
          onError: () =>
            setRequestError("Une erreur est survenue lors de la mise à jour"),
        }
      );
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
              validationErrors={validationError}
              genericError={requestError}
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
