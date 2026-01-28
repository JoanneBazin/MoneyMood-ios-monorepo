import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  BudgetDataCard,
  EntriesList,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useFixedEntriesAction } from "@/hooks/actions";
import { Entry, FixedEntriesDisplayProps } from "@/types";
import { BaseEntryForm } from "@shared/schemas";
import { useEffect, useState } from "react";

export const FixedEntriesDisplay = ({
  entries,
  type,
}: FixedEntriesDisplayProps) => {
  const totalEntries = entries.reduce((acc, entry) => acc + entry.amount, 0);
  const [newEntries, setNewEntries] = useState<BaseEntryForm[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const { actions, state, status } = useFixedEntriesAction({ type });

  useEffect(() => {
    if (selectedEntry) {
      actions.clearUpdateErrors();
    }
  }, [selectedEntry]);

  const handleAddEntries = () => {
    actions.addEntries(newEntries, () => setNewEntries([]));
  };

  const handleUpdateEntry = (updatedEntry: BaseEntryForm, entryId: string) => {
    if (
      updatedEntry.name === selectedEntry?.name &&
      Number(updatedEntry.amount) === selectedEntry.amount
    ) {
      setSelectedEntry(null);
      return;
    }

    actions.updateEntry(updatedEntry, entryId, () => setSelectedEntry(null));
  };

  const handleDeleteEntry = (entryId: string) => {
    actions.deleteEntry(entryId, () => setSelectedEntry(null));
  };

  return (
    <>
      {state.dashboardError && <ErrorMessage message={state.dashboardError} />}
      <BudgetDataCard
        title={type === "incomes" ? "Mes revenus fixes" : "Mes charges fixes"}
      >
        <EntriesList data={entries} setSelectedEntry={setSelectedEntry} />

        <AddEntriesForm
          initialData={newEntries}
          errors={state.addValidationErrors}
          onResetErrors={() => actions.clearAddValidationErrors}
          onChange={setNewEntries}
          type={type}
        />
        {newEntries.length > 0 && (
          <button
            onClick={handleAddEntries}
            className="primary-btn"
            data-testid={`add-${type}-btn`}
            disabled={status.isAdding}
          >
            Enregistrer
          </button>
        )}

        <TotalDataDisplay total={totalEntries} />

        {selectedEntry && (
          <Modal
            isOpen={!!selectedEntry}
            onClose={() => setSelectedEntry(null)}
            title={`Mettre à jour les ${type === "charges" ? "charges" : "revenus"}`}
          >
            <UpdateEntryForm
              initialData={selectedEntry}
              validationErrors={state.updateValidationError}
              genericError={state.modalError}
              onSubmit={handleUpdateEntry}
              onDelete={handleDeleteEntry}
              onResetErrors={() => actions.clearUpdateErrors()}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
