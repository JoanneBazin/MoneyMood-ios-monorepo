import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  BudgetDataCard,
  DataList,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import {
  useAddFixedChargesMutation,
  useDeleteFixedChargeMutation,
  useUpdateFixedChargeMutation,
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

export const FixedChargesDisplay = () => {
  const fixedCharges = useBudgetStore((s) => s.fixedCharges);
  const totalCharges = fixedCharges.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newCharges, setNewCharges] = useState<NewBudgetEntry[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<BudgetEntry | null>(null);

  const addFixedCharges = useAddFixedChargesMutation();
  const updateFixedCharge = useUpdateFixedChargeMutation();
  const deleteFixedCharge = useDeleteFixedChargeMutation();

  const [validationError, setValidationError] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const genericAddError = addFixedCharges.isError;
  const [genericUpdateError, setGenericUpdateError] = useState<string | null>(
    null
  );
  const [genericDeleteError, setGenericDeleteError] = useState<string | null>(
    null
  );

  const handleAddCharges = () => {
    setValidationError(null);

    const validation = validateArrayWithSchema(baseEntrySchema, newCharges);

    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addFixedCharges.mutate(validation.data, {
      onSuccess: () => setNewCharges([]),
    });
  };

  const handleUpdateCharge = (updatedCharge: UpdatedBudgetEntry) => {
    setUpdateValidationError(null);
    setGenericUpdateError(null);

    const validation = validateWithSchema(budgetEntrySchema, updatedCharge);

    if (!validation.success) {
      setUpdateValidationError(validation.errors);
      return;
    }

    updateFixedCharge.mutate(validation.data, {
      onSuccess: () => setSelectedEntry(null),
      onError: () =>
        setGenericUpdateError("Une erreur est survenue lors de la mise à jour"),
    });
  };

  const handleDeleteCharge = (deletedCharge: BudgetEntry) => {
    setUpdateValidationError(null);
    setGenericDeleteError(null);

    deleteFixedCharge.mutate(deletedCharge.id, {
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
      <BudgetDataCard title="Mes charges fixes">
        <DataList
          data={fixedCharges}
          setSelectedEntry={setSelectedEntry}
          emptyMessage="Aucune charge fixe déclarée"
        />

        <AddEntriesForm
          initialData={newCharges}
          errors={validationError}
          onChange={setNewCharges}
          onResetErrors={() => setValidationError(null)}
          type="charge"
        />
        {newCharges.length > 0 && (
          <button
            onClick={handleAddCharges}
            className="primary-btn"
            disabled={addFixedCharges.isPending}
          >
            Enregistrer
          </button>
        )}

        <TotalDataDisplay total={totalCharges} />

        {selectedEntry && (
          <Modal
            isOpen={!!selectedEntry}
            onClose={() => setSelectedEntry(null)}
            title={`Mettre à jour les charges`}
          >
            <UpdateEntryForm
              initialData={selectedEntry}
              validationErrors={updateValidationError}
              genericError={genericUpdateError || genericDeleteError}
              onSubmit={handleUpdateCharge}
              onDelete={handleDeleteCharge}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
