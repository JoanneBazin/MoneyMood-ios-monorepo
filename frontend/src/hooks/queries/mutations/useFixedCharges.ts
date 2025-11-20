import {
  addFixedCharges,
  deleteFixedCharges,
  updateFixedCharge,
} from "@/lib/api/fixedCharges";
import { useBudgetStore } from "@/stores/budgetStore";
import { UpdateFixedEntryParams } from "@/types";
import { BaseEntryOutput } from "@shared/schemas";
import { useMutation } from "@tanstack/react-query";

export const useAddFixedChargesMutation = () => {
  const { fixedCharges, setFixedCharges } = useBudgetStore.getState();

  return useMutation({
    mutationFn: (charges: BaseEntryOutput[]) => addFixedCharges(charges),
    onSuccess: (charges) => {
      setFixedCharges([...fixedCharges, ...charges]);
    },
  });
};

export const useUpdateFixedChargeMutation = () => {
  const { fixedCharges, setFixedCharges } = useBudgetStore.getState();

  return useMutation({
    mutationFn: ({ entry, entryId }: UpdateFixedEntryParams) =>
      updateFixedCharge(entry, entryId),
    onSuccess: (updatedCharge) => {
      const updatedCharges = fixedCharges.map((charge) =>
        charge.id === updatedCharge.id ? updatedCharge : charge
      );

      setFixedCharges(updatedCharges);
    },
  });
};

export const useDeleteFixedChargeMutation = () => {
  const { fixedCharges, setFixedCharges } = useBudgetStore.getState();

  return useMutation({
    mutationFn: (chargeId: string) => deleteFixedCharges(chargeId),
    onSuccess: (result) => {
      const updatedCharges = fixedCharges.filter(
        (charge) => charge.id !== result.id
      );

      setFixedCharges(updatedCharges);
    },
  });
};
