import { MonthlyEntryType } from "@/types";
import {
  useAddFixedEntriesMutation,
  useDeleteFixedEntryMutation,
  useUpdateFixedEntryMutation,
} from "../queries/mutations";
import { useState } from "react";
import {
  BaseEntryForm,
  baseEntrySchema,
  validateArrayWithSchema,
  validateWithSchema,
} from "@shared/schemas";

export const useFixedEntriesAction = ({ type }: { type: MonthlyEntryType }) => {
  const addMutation = useAddFixedEntriesMutation();
  const updateMutation = useUpdateFixedEntryMutation();
  const deleteMutation = useDeleteFixedEntryMutation();

  const [addValidationErrors, setAddValidationErrors] = useState<
    Record<string, string>[] | null
  >(null);
  const [updateValidationError, setUpdateValidationError] = useState<Record<
    string,
    string
  > | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const addEntries = (newEntries: BaseEntryForm[], onSuccess?: () => void) => {
    setAddValidationErrors(null);
    setDashboardError(null);

    const { data, success, errors } = validateArrayWithSchema(
      baseEntrySchema,
      newEntries,
    );
    if (!success) {
      setAddValidationErrors(Object.values(errors));
      return;
    }

    addMutation.mutate(
      { entries: data, type },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  const updateEntry = (
    updatedEntry: BaseEntryForm,
    entryId: string,
    onSuccess?: () => void,
  ) => {
    setUpdateValidationError(null);
    setModalError(null);

    const { data, success, errors } = validateWithSchema(
      baseEntrySchema,
      updatedEntry,
    );

    if (!success) {
      setUpdateValidationError(errors);
      return;
    }

    updateMutation.mutate(
      { entry: data, entryId, type },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () =>
          setModalError("Une erreur est survenue lors de la mise à jour"),
      },
    );
  };

  const deleteEntry = (entryId: string, onSuccess?: () => void) => {
    setUpdateValidationError(null);
    setModalError(null);

    deleteMutation.mutate(
      { entryId, type },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: () =>
          setModalError("Une erreur est survenue lors de la suppression"),
      },
    );
  };

  return {
    actions: {
      addEntries,
      updateEntry,
      deleteEntry,
      clearAddValidationErrors: () => setAddValidationErrors(null),
      clearUpdateErrors: () => {
        setUpdateValidationError(null);
        setModalError(null);
      },
    },
    state: {
      addValidationErrors,
      updateValidationError,
      dashboardError,
      modalError,
    },
    status: {
      isAdding: addMutation.isPending,
      isUpdating: updateMutation.isPending,
      isDeleting: deleteMutation.isPending,
    },
  };
};
