import { Check, X } from "lucide-react";
import { useState } from "react";
import { UpdateEntryFormProps, UpdateExpenseEntry } from "@/types";
import { ErrorMessage } from "../ui/ErrorMessage";

export const UpdateEntryForm = ({
  initialData,
  validationErrors,
  genericError,
  onSubmit,
  onDelete,
  children,
}: UpdateEntryFormProps) => {
  const { id, name, amount } = initialData;
  const [updatedEntry, setUpdatedEntry] = useState<UpdateExpenseEntry>({
    id,
    name,
    amount,
  });
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
            value={updatedEntry.name}
            onChange={(e) =>
              setUpdatedEntry({ ...updatedEntry, name: e.target.value })
            }
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
                name="amount"
                value={updatedEntry.amount}
                onChange={(e) =>
                  setUpdatedEntry({ ...updatedEntry, amount: e.target.value })
                }
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
          onClick={() => setConfirmDelete(true)}
        >
          Supprimer
        </button>
        <button
          type="button"
          onClick={() => onSubmit(updatedEntry)}
          className="primary-btn"
        >
          Modifier
        </button>
      </div>
      {confirmDelete && (
        <div className="delete-item flex-end">
          <p>Supprimer cette entrée ?</p>
          <button
            type="button"
            onClick={() => updatedEntry.id && onDelete(updatedEntry.id)}
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
    </form>
  );
};
