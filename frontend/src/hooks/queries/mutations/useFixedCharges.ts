import {
  addFixedCharges,
  deleteFixedCharge,
  updateFixedCharge,
} from "@/lib/api";
import { Entry, UpdateFixedEntryParams } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFixedChargesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (charges: BaseEntryOutput[]) => addFixedCharges(charges),
    onSuccess: (charges) => {
      queryClient.setQueryData(["fixedCharges"], (prev: Entry[]) => [
        ...prev,
        ...charges,
      ]);
    },
  });
};

export const useUpdateFixedChargeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entry, entryId }: UpdateFixedEntryParams) =>
      updateFixedCharge(entry, entryId),
    onSuccess: (updatedCharge) => {
      queryClient.setQueryData(["fixedCharges"], (prev: Entry[]) =>
        prev.map((c) => (c.id === updatedCharge.id ? updatedCharge : c))
      );
    },
  });
};

export const useDeleteFixedChargeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chargeId: string) => deleteFixedCharge(chargeId),
    onSuccess: (result) => {
      queryClient.setQueryData(["fixedCharges"], (prev: Entry[]) =>
        prev.filter((c) => c.id !== result.id)
      );
    },
  });
};
