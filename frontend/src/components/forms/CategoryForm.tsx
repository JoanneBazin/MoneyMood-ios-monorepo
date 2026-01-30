import { useState } from "react";
import { ErrorMessage } from "../ui";
import { X } from "lucide-react";
import { CategoryFormProps } from "@/types";

export const CategoryForm = ({
  validationErrors,
  genericError,
  onSubmit,
  isPending,
  onDelete,
  initialData,
  edit = false,
}: CategoryFormProps) => {
  const [category, setCategory] = useState({ name: initialData ?? "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <form data-testid="cat-form">
      {genericError && <ErrorMessage message={genericError} />}
      <div className="input-item">
        <div>
          <input
            type="text"
            placeholder="Nom"
            aria-label="Nom de la dépense"
            name="name"
            value={category.name}
            onChange={(e) => setCategory({ name: e.target.value })}
          />
          {validationErrors && validationErrors.name ? (
            <p className="form-error">{validationErrors.name}</p>
          ) : null}
        </div>
      </div>

      <div className="flex-end">
        {edit && (
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setConfirmDelete(true)}
            data-testid="delete-cat-btn"
          >
            Supprimer
          </button>
        )}
        <button
          type="button"
          onClick={() => onSubmit(category)}
          className="primary-btn"
          data-testid={edit ? "update-cat" : "create-cat"}
          disabled={isPending}
        >
          {edit ? "Mettre à jour" : "Créer"}
        </button>
      </div>
      {confirmDelete && onDelete && (
        <div className="delete-cat-options">
          <p>Voulez-vous supprimer les dépenses associées ?</p>

          <div className="delete-item flex-end">
            <button
              type="button"
              onClick={() => onDelete(true)}
              className="delete-item__option primary"
              data-testid="delete-cat-cascade"
            >
              Supprimer tout
            </button>
            <button
              type="button"
              onClick={() => onDelete(false)}
              className="delete-item__option secondary"
              data-testid="delete-cat-only"
            >
              Uniquement la catégorie
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="delete-item__button cancel"
              aria-label="Annuler"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
