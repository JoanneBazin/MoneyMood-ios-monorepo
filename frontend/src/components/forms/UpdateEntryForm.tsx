import { Check, X } from "lucide-react";
import { useState } from "react";
import { UpdateEntryFormProps } from "@/types";
import { ErrorMessage } from "../ui";
import { BaseEntryForm } from "@shared/schemas";

export const UpdateEntryForm = ({
  initialData,
  validationErrors,
  genericError,
  onSubmit,
  onDelete,
  onResetErrors,
  children,
}: UpdateEntryFormProps) => {
  const { id, name, amount } = initialData;
  const [updatedEntry, setUpdatedEntry] = useState<BaseEntryForm>({
    name,
    amount: amount.toString(),
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (field: keyof BaseEntryForm, value: string) => {
    onResetErrors();
    setUpdatedEntry({ ...updatedEntry, [field]: value });
  };

  return (
    <form data-testid="update-item-form">
      {genericError && <ErrorMessage message={genericError} />}
      <div className="input-item">
        <div>
          <input
            type="text"
            placeholder="Nom"
            aria-label="Nom de la dépense"
            data-testid="update-name-input"
            name="name"
            value={updatedEntry.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {validationErrors && validationErrors.name ? (
            <p className="form-error">{validationErrors.name}</p>
          ) : null}
        </div>
        <div className="input-item__right">
          <div className="input-item__right__amount">
            <div className="flex-center">
              <span className="mr-xxs">€</span>
              <input
                type="number"
                placeholder="Montant"
                aria-label="Montant de la dépense"
                data-testid="update-amount-input"
                name="amount"
                value={updatedEntry.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
              />
            </div>
          </div>
          {validationErrors && validationErrors.amount ? (
            <p className="form-error">Montant invalide</p>
          ) : null}
        </div>
      </div>
      {children}

      <div className="flex-end">
        <button
          type="button"
          className="secondary-btn"
          data-testid="delete-btn"
          onClick={() => setConfirmDelete((prev) => !prev)}
        >
          Supprimer
        </button>
        <button
          type="button"
          onClick={() => onSubmit(updatedEntry, id)}
          className="primary-btn"
          data-testid="update-btn"
        >
          Modifier
        </button>
      </div>
      {confirmDelete && (
        <div className="delete-item flex-end">
          <p>Supprimer cette entrée ?</p>
          <button
            type="button"
            onClick={() => onDelete(id)}
            className="delete-item__button valid"
            data-testid="confirm-delete-btn"
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
    </form>
  );
};
