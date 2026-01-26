import { useEffect, useState } from "react";
import { BaseEntryForm } from "@shared/schemas";
import { BudgetDataCard, EntriesList, Modal } from "@/components/ui";
import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import { Entry, MonthlyEntriesView } from "@/types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { RemainingBudgetDisplay } from "@/components/ui/RemainingBudgetDisplay";
import { useMonthlyEntriesAction } from "@/hooks/actions";

export const MonthlyEntries = ({
  type,
  data,
  dateTitle,
  budgetId,
}: MonthlyEntriesView) => {
  const totalData = data.reduce((acc, entry) => acc + entry.amount, 0);
  const entryTitle = type === "incomes" ? "Revenus" : "Charges";
  const title = entryTitle + " " + dateTitle;

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [newEntries, setNewEntries] = useState<BaseEntryForm[]>([]);

  const { actions, state, status } = useMonthlyEntriesAction({
    budgetId,
    type,
  });

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
    <section>
      <RemainingBudgetDisplay
        type={`Total ${type === "charges" ? "charges" : "revenus"}`}
        total={totalData}
      />

      {state.dashboardError && <ErrorMessage message={state.dashboardError} />}

      <div className="my-2xl">
        <BudgetDataCard title={title} color="black">
          <EntriesList data={data} setSelectedEntry={setSelectedEntry} />

          <AddEntriesForm
            initialData={newEntries}
            errors={state.addValidationErrors}
            onChange={setNewEntries}
            onResetErrors={() => actions.clearAddValidationErrors}
            type={type}
          />
          {newEntries.length > 0 && (
            <button
              onClick={handleAddEntries}
              className="primary-btn"
              data-testid="add-entries-btn"
              disabled={status.isAdding}
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
          title={`Mettre à jour les ${
            type === "charges" ? "charges" : "revenus"
          }`}
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
    </section>
  );
};
