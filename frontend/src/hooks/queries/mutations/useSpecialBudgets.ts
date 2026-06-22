import {
  addSpecialBudget,
  deleteSpecialBudget,
  updateSpecialBudget,
} from "@/lib/api";
import { UpdateSpecialBudgetParams } from "@/types";
import { SpecialBudgetOutput } from "@shared/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAddSpecialBudgetMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newBudget: SpecialBudgetOutput) => addSpecialBudget(newBudget),
    onSuccess: (newBudget) => {
      queryClient.setQueryData(["specialBudget", newBudget.id], newBudget);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(`/app/projects/${newBudget.id}`);
    },
  });
};

export const useUpdateSpecialBudgetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ budget, budgetId }: UpdateSpecialBudgetParams) =>
      updateSpecialBudget(budget, budgetId),
    onSuccess: (updatedBudget, variables) => {
      queryClient.setQueryData(
        ["specialBudget", variables.budgetId],
        updatedBudget,
      );
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteSpecialBudgetMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (budgetId: string) => deleteSpecialBudget(budgetId),
    onSuccess: (result) => {
      queryClient.removeQueries({ queryKey: ["specialBudget", result.id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/app/projects");
    },
  });
};
