import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { DataList, Modal } from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import {
  useAddSpecialExpenseMutation,
  useDeleteSpecialExpenseMutation,
  useUpdateSpecialExpenseMutation,
} from "@/hooks/queries/mutations/useSpecialExpenses";
import {
  BaseEntryForm,
  ProjectExpensesProp,
  SpecialExpenseEntry,
  UpdateExpenseEntry,
} from "@/types";
import {
  specialExpenseEntrySchema,
  updateExpenseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";

export const ProjectExpenses = ({
  budgetId,
  expenses,
}: ProjectExpensesProp) => {
  const [newExpenses, setNewExpenses] = useState<BaseEntryForm[]>([]);
  const [selectedEntry, setSelectedEntry] =
    useState<SpecialExpenseEntry | null>(null);
  const addExpenses = useAddSpecialExpenseMutation();
  const updateExpense = useUpdateSpecialExpenseMutation();
  const deleteExpense = useDeleteSpecialExpenseMutation();
  const [validationError, setValidationError] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const genericAddError = addExpenses.isError;
  const [genericUpdateError, setGenericUpdateError] = useState<string | null>(
    null
  );
  const [genericDeleteError, setGenericDeleteError] = useState<string | null>(
    null
  );

  const handleAddExpenses = () => {
    setValidationError(null);

    const validation = validateArrayWithSchema(
      specialExpenseEntrySchema,
      newExpenses
    );
    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addExpenses.mutate(
      { expenses: validation.data, budgetId },
      { onSuccess: () => setNewExpenses([]) }
    );
  };

  const handleUpdateExpense = (updatedExpense: UpdateExpenseEntry) => {
    setUpdateValidationError(null);
    setGenericUpdateError(null);

    const validation = validateWithSchema(
      updateExpenseEntrySchema,
      updatedExpense
    );

    if (!validation.success) {
      setUpdateValidationError(validation.errors);
      return;
    }

    updateExpense.mutate(
      { expense: validation.data, budgetId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setGenericUpdateError(
            "Une erreur est survenue lors de la mise à jour"
          ),
      }
    );
  };

  const handleDeleteExpense = (expenseId: string) => {
    setUpdateValidationError(null);
    setGenericDeleteError(null);

    deleteExpense.mutate(
      { expenseId: expenseId, budgetId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setGenericDeleteError(
            "Une erreur est survenue lors de la suppression"
          ),
      }
    );
  };

  return (
    <div className="my-2xl">
      {genericAddError && (
        <ErrorMessage message="Une erreur interne est survenue" />
      )}
      <DataList<SpecialExpenseEntry>
        data={expenses}
        setSelectedEntry={setSelectedEntry}
        emptyMessage="Pas de dépense pour ce budget"
      />
      <AddEntriesForm
        initialData={newExpenses}
        errors={validationError}
        onChange={setNewExpenses}
        onResetErrors={() => setValidationError(null)}
        type="special-expense"
      />
      {newExpenses.length > 0 && (
        <button
          onClick={handleAddExpenses}
          className="primary-btn"
          data-testid="submit-form-entry"
          disabled={addExpenses.isPending}
        >
          Enregistrer
        </button>
      )}

      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Mettre à jour les dépenses`}
        >
          <UpdateEntryForm
            initialData={selectedEntry}
            validationErrors={updateValidationError}
            genericError={genericUpdateError || genericDeleteError}
            onSubmit={handleUpdateExpense}
            onDelete={handleDeleteExpense}
          />
        </Modal>
      )}
    </div>
  );
};
