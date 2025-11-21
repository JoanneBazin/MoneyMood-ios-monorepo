import { CategoryEntryForm, SpecialBudgetForm } from "@shared/schemas";
import { SpecialExpenseEntry } from "./entries";

export interface SpecialBudget {
  id: string;
  name: string;
  remainingBudget: number;
  totalBudget: number;
  createdAt: string;
  expenses: SpecialExpenseEntry[];
  categories: SpecialBudgetCategory[];
}

export interface SpecialBudgetItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface SpecialBudgetCategory {
  id: string;
  name: string;
  specialBudgetId: string;
  expenses: SpecialExpenseEntry[];
}

export interface ProjectCategorySectionProps {
  category: {
    id: string;
    name: string;
  };
  budgetId: string;
  children: React.ReactNode;
}

export interface SpecialBudgetOptionsProps {
  budgetId: string;
  updatableData: SpecialBudgetForm;
}

export interface ProjectExpensesProp {
  budgetId: string;
  expenses: SpecialExpenseEntry[];
  categoryId?: string;
}

// Mutations

export interface UpdateSpecialBudgetParams {
  budget: SpecialBudgetForm;
  budgetId: string;
}

interface BaseSpecialCategoryParams {
  categoryId: string;
  budgetId: string;
}

export interface AddSpecialCategoryParams {
  category: CategoryEntryForm;
  budgetId: string;
}

export interface UpdateSpecialCategoryParams extends BaseSpecialCategoryParams {
  category: CategoryEntryForm;
}

export interface DeleteSpecialCategoryParams
  extends BaseSpecialCategoryParams {}

export interface DeleteSpecialCategoryResponse {
  id: string;
  expenses: SpecialExpenseEntry[];
}
