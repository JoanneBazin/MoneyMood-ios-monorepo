import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  BudgetDataCard,
  DataList,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useFixedIncomesQuery } from "@/hooks/queries";
import {
  useAddFixedIncomesMutation,
  useDeleteFixedIncomeMutation,
  useUpdateFixedIncomeMutation,
} from "@/hooks/queries/mutations";
import { Entry } from "@/types";
import {
  BaseEntryForm,
  baseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";

export const FixedIncomesDisplay = () => {
  const { data: fixedIncomes = [] } = useFixedIncomesQuery();

  const totalIncomes = fixedIncomes.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newIncomes, setNewIncomes] = useState<BaseEntryForm[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

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
  const addRequestError = addFixedIncomes.isError;
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleAddIncomes = () => {
    setValidationError(null);
    setRequestError(null);

    const validation = validateArrayWithSchema(baseEntrySchema, newIncomes);

    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addFixedIncomes.mutate(validation.data, {
      onSuccess: () => setNewIncomes([]),
    });
  };

  const handleUpdateIncome = (
    updatedIncome: BaseEntryForm,
    entryId: string
  ) => {
    setUpdateValidationError(null);
    setRequestError(null);

    const { data, success, errors } = validateWithSchema(
      baseEntrySchema,
      updatedIncome
    );

    if (!success) {
      setUpdateValidationError(errors);
      return;
    }

    if (
      data.name === selectedEntry?.name &&
      data.amount === selectedEntry.amount
    ) {
      setSelectedEntry(null);
      return;
    }

    updateFixedIncome.mutate(
      { entry: data, entryId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  const handleDeleteIncome = (entryId: string) => {
    setUpdateValidationError(null);
    setRequestError(null);

    deleteFixedIncome.mutate(entryId, {
      onSuccess: () => setSelectedEntry(null),
      onError: () =>
        setRequestError("Une erreur est survenue lors de la suppression"),
    });
  };

  return (
    <>
      {addRequestError && (
        <ErrorMessage message="Une erreur est survenue lors de la création" />
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
          type="incomes"
        />
        {newIncomes.length > 0 && (
          <button
            onClick={handleAddIncomes}
            className="primary-btn"
            data-testid="add-incomes-btn"
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
              genericError={requestError}
              onSubmit={handleUpdateIncome}
              onDelete={handleDeleteIncome}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
