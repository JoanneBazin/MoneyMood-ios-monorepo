import { SpecialBudgetForm, SpecialExpenseEntryForm } from "@shared/schemas";
import { SpecialExpenseEntry, UpdateExpenseEntry } from "./entries";

export interface SpecialBudget {
  id: string;
  remainingBudget: number;
  userId: string;
  createdAt: Date;
  name: string;
  totalBudget: number;
  expenses: SpecialExpenseEntry[];
}

export interface SpecialBudgetItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface SpecialBudgetCardProps {
  data: SpecialBudgetItem;
}

export interface UpdateSpecialBudgetType {
  budget: SpecialBudgetForm;
  id: string;
}

export interface SpecialBudgetOptionsProps {
  budgetId: string;
  updatableData: SpecialBudgetForm;
  onError: () => void;
}

export interface ProjectExpensesProp {
  budgetId: string;
  expenses: SpecialExpenseEntry[];
}

export interface AddSpecialExpensesProps {
  expenses: SpecialExpenseEntryForm[];
  budgetId: string;
}
export interface UpdateSpecialExpensesProps {
  expense: UpdateExpenseEntry;
  budgetId: string;
}
