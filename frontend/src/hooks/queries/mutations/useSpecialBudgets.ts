import {
  addSpecialBudget,
  deleteSpecialBudget,
  updateSpecialBudget,
} from "@/lib/api/specialBudgets";
import { queryClient } from "@/lib/queryClient";
import { UpdateSpecialBudgetType } from "@/types";
import { SpecialBudgetForm } from "@shared/schemas";
import { useMutation } from "@tanstack/react-query";

export const useAddSpecialBudgetMutation = () => {
  return useMutation({
    mutationFn: (newBudget: SpecialBudgetForm) => addSpecialBudget(newBudget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateSpecialBudgetMutation = () => {
  return useMutation({
    mutationFn: ({ budget, id }: UpdateSpecialBudgetType) =>
      updateSpecialBudget(budget, id),
    onSuccess: (updatedBudget: SpecialBudgetForm, variables) => {
      queryClient.setQueryData(["specialBudget", variables.id], updatedBudget);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeletepecialBudgetMutation = () => {
  return useMutation({
    mutationFn: (budgetId: string) => deleteSpecialBudget(budgetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
