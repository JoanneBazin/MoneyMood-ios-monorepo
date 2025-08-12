import {
  addFixedCharges,
  deleteFixedCharges,
  updateFixedCharge,
} from "@/lib/api/fixedCharges";
import { useBudgetStore } from "@/stores/budgetStore";
import { BudgetEntry, BudgetEntryForm } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFixedChargesMutation = () => {
  const queryClient = useQueryClient();
  const { fixedCharges, setFixedCharges } = useBudgetStore.getState();

  return useMutation({
    mutationFn: (charges: BudgetEntryForm[]) => addFixedCharges(charges),
    onSuccess: (charges) => {
      const updatedCharges = [...fixedCharges, ...charges];

      setFixedCharges(updatedCharges);
      queryClient.setQueryData(["fixedCharges"], updatedCharges);
    },
  });
};

export const useUpdateFixedChargeMutation = () => {
  const queryClient = useQueryClient();
  const { fixedCharges, setFixedCharges } = useBudgetStore.getState();

  return useMutation({
    mutationFn: (charge: BudgetEntry) => updateFixedCharge(charge),
    onSuccess: (updatedCharge) => {
      const updatedCharges = fixedCharges.map((charge) =>
        charge.id === updatedCharge.id ? updatedCharge : charge
      );

      setFixedCharges(updatedCharges);
      queryClient.setQueryData(["fixedCharges"], updatedCharges);
    },
  });
};

export const useDeleteFixedChargeMutation = () => {
  const queryClient = useQueryClient();
  const { fixedCharges, setFixedCharges } = useBudgetStore.getState();

  return useMutation({
    mutationFn: (chargeId: string) => deleteFixedCharges(chargeId),
    onSuccess: ({ chargeId }) => {
      const updatedCharges = fixedCharges.filter(
        (charge) => charge.id !== chargeId
      );

      setFixedCharges(updatedCharges);
      queryClient.setQueryData(["fixedCharges"], updatedCharges);
    },
  });
};
