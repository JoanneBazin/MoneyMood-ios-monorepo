import {
  CategoryFormProps,
  SpecialBudgetForm,
  SpecialExpenseEntryForm,
} from "@shared/schemas";
import { SpecialExpenseEntry, UpdateExpenseEntry } from "./entries";
import { UpdateCategoryFormProps } from "@moneymood-monorepo/shared";

export interface SpecialBudget {
  id: string;
  remainingBudget: number;
  userId: string;
  createdAt: Date;
  name: string;
  totalBudget: number;
  expenses: SpecialExpenseEntry[];
  categories: SpecialCategoryProps[];
}

export interface SpecialCategoryProps {
  id: string;
  name: string;
  specialBudgetId: string;
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
  categoryId?: string;
}

export interface AddSpecialExpensesProps {
  expenses: SpecialExpenseEntryForm[];
  budgetId: string;
  categoryId?: string;
}
export interface UpdateSpecialExpensesProps {
  expense: UpdateExpenseEntry;
  budgetId: string;
}
export interface AddSpecialCategoryProps {
  category: CategoryFormProps;
  budgetId: string;
}
export interface UpdateSpecialCategoryProps {
  category: UpdateCategoryFormProps;
  budgetId: string;
}

export interface ProjectCategorySectionProps {
  category: {
    id: string;
    name: string;
  };
  budgetId: string;
  children: React.ReactNode;
}
