import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  BudgetDataCard,
  DataList,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import {
  useAddFixedIncomesMutation,
  useDeleteFixedIncomeMutation,
  useUpdateFixedIncomeMutation,
} from "@/hooks/queries/mutations";
import { useBudgetStore } from "@/stores/budgetStore";
import { NewBudgetEntry, UpdatedBudgetEntry } from "@/types";
import {
  baseEntrySchema,
  BudgetEntry,
  budgetEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";

export const FixedIncomesDisplay = () => {
  const fixedIncomes = useBudgetStore((s) => s.fixedIncomes);
  const totalIncomes = fixedIncomes.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newIncomes, setNewIncomes] = useState<NewBudgetEntry[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<BudgetEntry | null>(null);

  const addFixedIncomes = useAddFixedIncomesMutation();
  const updateFixedIncome = useUpdateFixedIncomeMutation();
  const deleteFixedIncome = useDeleteFixedIncomeMutation();

  const [validationError, setValidationError] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const genericAddError = addFixedIncomes.isError;
  const [genericUpdateError, setGenericUpdateError] = useState<string | null>(
    null
  );
  const [genericDeleteError, setGenericDeleteError] = useState<string | null>(
    null
  );

  const handleAddIncomes = () => {
    setValidationError(null);

    const validation = validateArrayWithSchema(baseEntrySchema, newIncomes);

    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addFixedIncomes.mutate(validation.data, {
      onSuccess: () => setNewIncomes([]),
    });
  };

  const handleUpdateIncome = (updatedIncome: UpdatedBudgetEntry) => {
    setUpdateValidationError(null);
    setGenericUpdateError(null);

    const validation = validateWithSchema(budgetEntrySchema, updatedIncome);

    if (!validation.success) {
      setUpdateValidationError(validation.errors);
      return;
    }

    updateFixedIncome.mutate(validation.data, {
      onSuccess: () => setSelectedEntry(null),
      onError: () =>
        setGenericUpdateError("Une erreur est survenue lors de la mise à jour"),
    });
  };

  const handleDeleteIncome = (deletedIncome: BudgetEntry) => {
    setUpdateValidationError(null);
    setGenericDeleteError(null);

    deleteFixedIncome.mutate(deletedIncome.id, {
      onSuccess: () => setSelectedEntry(null),
      onError: () =>
        setGenericDeleteError("Une erreur est survenue lors de la suppression"),
    });
  };

  return (
    <>
      {genericAddError && (
        <ErrorMessage message="Une erreur interne est survenue" />
      )}
      <BudgetDataCard title="Mes revenus fixes">
        <DataList
          data={fixedIncomes}
          setSelectedEntry={setSelectedEntry}
          emptyMessage="Aucun revenu fixe déclaré"
        />

        <AddEntriesForm
          initialData={newIncomes}
          errors={validationError}
          onChange={setNewIncomes}
          onResetErrors={() => setValidationError(null)}
          type="income"
        />
        {newIncomes.length > 0 && (
          <button
            onClick={handleAddIncomes}
            className="primary-btn"
            disabled={addFixedIncomes.isPending}
          >
            Enregistrer
          </button>
        )}

        <TotalDataDisplay total={totalIncomes} />

        {selectedEntry && (
          <Modal
            isOpen={!!selectedEntry}
            onClose={() => setSelectedEntry(null)}
            title={`Mettre à jour les revenus`}
          >
            <UpdateEntryForm
              initialData={selectedEntry}
              validationErrors={updateValidationError}
              genericError={genericUpdateError || genericDeleteError}
              onSubmit={handleUpdateIncome}
              onDelete={handleDeleteIncome}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
