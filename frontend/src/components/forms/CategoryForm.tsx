import { AddCategoryFormProps } from "@/types";
import { useState } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { Check, X } from "lucide-react";

export const CategoryForm = ({
  validationErrors,
  genericError,
  onSubmit,
  onDelete,
  initialData,
  edit = false,
}: AddCategoryFormProps) => {
  const [category, setCategory] = useState({ name: initialData ?? "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <form>
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
      {edit && (
        <div>
          <button
            type="button"
            className="delete-btn"
            onClick={() => setConfirmDelete(true)}
            aria-label="Supprimer cette ligne"
          >
            x
          </button>
          {confirmDelete && (
            <div className="delete-item">
              <p>Supprimer cette entrée ?</p>
              <button
                type="button"
                onClick={onDelete}
                className="delete-item__button valid"
              >
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="delete-item__button cancel"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => onSubmit(category)}
        className="primary-btn"
      >
        {edit ? "Mettre à jour" : "Créer"}
      </button>
    </form>
  );
};
