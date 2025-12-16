import { AddEntriesForm, UpdateEntryForm } from "@/components/forms";
import {
  BudgetDataCard,
  DataList,
  Modal,
  TotalDataDisplay,
} from "@/components/ui";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useFixedChargesQuery } from "@/hooks/queries";
import {
  useAddFixedChargesMutation,
  useDeleteFixedChargeMutation,
  useUpdateFixedChargeMutation,
} from "@/hooks/queries/mutations";
import { Entry } from "@/types";
import {
  BaseEntryForm,
  baseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";
import { useState } from "react";

export const FixedChargesDisplay = () => {
  const { data: fixedCharges = [] } = useFixedChargesQuery();
  const totalCharges = fixedCharges.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const [newCharges, setNewCharges] = useState<BaseEntryForm[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

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
  const addRequestError = addFixedCharges.isError;
  const [requestError, setRequestError] = useState<string | null>(null);

  const handleAddCharges = () => {
    setValidationError(null);
    setRequestError(null);

    const validation = validateArrayWithSchema(baseEntrySchema, newCharges);

    if (!validation.success) {
      setValidationError(Object.values(validation.errors));
      return;
    }

    addFixedCharges.mutate(validation.data, {
      onSuccess: () => setNewCharges([]),
    });
  };

  const handleUpdateCharge = (
    updatedCharge: BaseEntryForm,
    entryId: string
  ) => {
    setUpdateValidationError(null);
    setRequestError(null);

    const { data, success, errors } = validateWithSchema(
      baseEntrySchema,
      updatedCharge
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

    updateFixedCharge.mutate(
      { entry: data, entryId },
      {
        onSuccess: () => setSelectedEntry(null),
        onError: () =>
          setRequestError("Une erreur est survenue lors de la mise à jour"),
      }
    );
  };

  const handleDeleteCharge = (entryId: string) => {
    setUpdateValidationError(null);
    setRequestError(null);

    deleteFixedCharge.mutate(entryId, {
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
          type="charges"
        />
        {newCharges.length > 0 && (
          <button
            onClick={handleAddCharges}
            className="primary-btn"
            data-testid="add-charges-btn"
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
              genericError={requestError}
              onSubmit={handleUpdateCharge}
              onDelete={handleDeleteCharge}
            />
          </Modal>
        )}
      </BudgetDataCard>
    </>
  );
};
