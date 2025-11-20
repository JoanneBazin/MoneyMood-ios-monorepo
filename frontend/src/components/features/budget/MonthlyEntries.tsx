import { useState } from "react";
import {
  BaseEntryForm,
  baseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import {
  useAddMonthlyEntriesMutation,
  useDeleteMonthlyEntriesMutation,
  useUpdateMonthlyEntriesMutation,
} from "@/hooks/queries/mutations";
import { BudgetDataCard, DataList, Modal } from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { Entry, MonthlyEntriesView } from "@/types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { RemainingBudgetDisplay } from "@/components/ui/RemainingBudgetDisplay";

export const MonthlyEntries = ({
  type,
  data,
  dateTitle,
  budgetId,
}: MonthlyEntriesView) => {
  const totalData = data.reduce((acc, entry) => acc + entry.amount, 0);
  const title = type.charAt(0).toUpperCase() + type.slice(1) + " " + dateTitle;

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [newEntries, setNewEntries] = useState<BaseEntryForm[]>([]);

  const addMonthlyEntries = useAddMonthlyEntriesMutation();
  const updateMonthlyEntry = useUpdateMonthlyEntriesMutation();
  const deleteMonthlyEntry = useDeleteMonthlyEntriesMutation();

  const [validationError, setValidationError] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const addRequestError = addMonthlyEntries.isError;
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleAddEntries = () => {
    setValidationError(null);

    const validation = validateArrayWithSchema(baseEntrySchema, newEntries);

    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addMonthlyEntries.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entries: validation.data,
        budgetId,
      },
      { onSuccess: () => setNewEntries([]) }
    );
  };

  const handleUpdateEntry = (updatedEntry: BaseEntryForm, entryId: string) => {
    setUpdateValidationError(null);
    setRequestError(null);

    const validation = validateWithSchema(baseEntrySchema, updatedEntry);

    if (!validation.success) {
      setUpdateValidationError(validation.errors);
      return;
    }

    updateMonthlyEntry.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entry: validation.data,
        entryId,
        budgetId,
      },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  const handleDeleteEntry = (entryId: string) => {
    setUpdateValidationError(null);
    setRequestError(null);

    deleteMonthlyEntry.mutate(
      {
        type: type === "charges" ? "charges" : "incomes",
        entryId,
        budgetId,
      },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la suppression"),
      }
    );
  };

  return (
    <section>
      <RemainingBudgetDisplay type={`Total ${type}`} total={totalData} />

      {addRequestError && (
        <ErrorMessage message="Une erreur interne est survenue lors de la création" />
      )}

      <div className="my-2xl">
        <BudgetDataCard title={title} color="black">
          <DataList
            data={data}
            setSelectedEntry={setSelectedEntry}
            emptyMessage={
              type === "charges"
                ? "Aucune charge déclarée"
                : "Aucun revenu déclaré"
            }
          />

          <AddEntriesForm
            initialData={newEntries}
            errors={validationError}
            onChange={setNewEntries}
            onResetErrors={() => setValidationError(null)}
            type={type}
          />
          {newEntries.length > 0 && (
            <button
              onClick={handleAddEntries}
              className="primary-btn"
              disabled={addMonthlyEntries.isPending}
            >
              Enregistrer
            </button>
          )}
        </BudgetDataCard>
      </div>

      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Mettre à jour les ${type}`}
        >
          <UpdateEntryForm
            initialData={selectedEntry}
            validationErrors={updateValidationError}
            genericError={requestError}
            onSubmit={handleUpdateEntry}
            onDelete={handleDeleteEntry}
          />
        </Modal>
      )}
    </section>
  );
};
