import { SpecialBudgetOutput } from "@shared/schemas";
import { SpecialBudget, SpecialBudgetItem } from "@/types";
import { apiFetch } from "@/lib/apiFetch";

export const fetchAllSpecialBudgets = async (): Promise<
  SpecialBudgetItem[]
> => {
  return apiFetch(`/api/special-budgets`);
};

export const fetchSpecialBudget = async (
  id: string,
): Promise<SpecialBudget> => {
  return apiFetch(`/api/special-budgets/${id}`);
};

export const addSpecialBudget = async (
  newBudget: SpecialBudgetOutput,
): Promise<SpecialBudget> => {
  return apiFetch(`/api/special-budgets`, {
    method: "POST",
    body: JSON.stringify(newBudget),
  });
};

export const updateSpecialBudget = async (
  budget: SpecialBudgetOutput,
  id: string,
): Promise<SpecialBudget> => {
  return apiFetch(`/api/special-budgets/${id}`, {
    method: "PUT",
    body: JSON.stringify(budget),
  });
};

export const deleteSpecialBudget = async (
  id: string,
): Promise<{ id: string }> => {
  return apiFetch(`/api/special-budgets/${id}`, {
    method: "DELETE",
  });
};
