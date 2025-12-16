import { useEffect, useState } from "react";
import { AddEntriesFormProps } from "@/types";
import { BaseEntryForm } from "@shared/schemas";

export const AddEntriesForm = ({
  initialData,
  errors,
  onChange,
  onResetErrors,
  type,
}: AddEntriesFormProps) => {
  const [entries, setEntries] = useState<BaseEntryForm[]>(initialData || []);

  useEffect(() => {
    setEntries([...(initialData || [])]);
  }, [initialData]);

  const handleUpdate = (
    index: number,
    field: keyof BaseEntryForm,
    value: string
  ) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index
        ? {
            ...entry,
            [field]: value,
          }
        : entry
    );
    onResetErrors();
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  const addEntry = () => {
    const updatedEntries = [...entries, { name: "", amount: "" }];
    onResetErrors();
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  const removeEntry = (entryIndex: number) => {
    const updatedEntries = entries.filter((_, index) => index !== entryIndex);
    onResetErrors();
    setEntries(updatedEntries);
    onChange(updatedEntries);
  };

  return (
    <form>
      {entries.map((entry, index) => (
        <div key={index}>
          <div className="input-item">
            <div>
              <input
                type="text"
                placeholder="Nom"
                aria-label="Nom de la dépense"
                name="name"
                className="name-input"
                data-testid={`${type}-name-input-${index}`}
                value={entry.name}
                onChange={(e) => handleUpdate(index, "name", e.target.value)}
              />
              {errors && errors[index] && errors[index].name ? (
                <p className="form-error" data-testid="name-input-error">
                  {errors[index].name}
                </p>
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
                    data-testid={`${type}-amount-input-${index}`}
                    value={entry.amount}
                    onChange={(e) =>
                      handleUpdate(index, "amount", e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  data-testid={`${type}-delete-btn-${index}`}
                  onClick={() => removeEntry(index)}
                  aria-label="Supprimer cette ligne"
                >
                  x
                </button>
              </div>
              {errors && errors[index] && errors[index].amount ? (
                <p className="form-error" data-testid="amount-input-error">
                  Montant invalide
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addEntry}
        className="add-btn"
        aria-label="Ajouter une ligne"
        data-testid={`add-${type}-input`}
      >
        +
      </button>
    </form>
  );
};
