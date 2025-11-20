import { CategoryFormProps, SpecialBudgetForm } from "@shared/schemas";
import { BaseEntryForm, UpdateExpenseEntry } from "../budget";
import React from "react";

export interface MonthYearPickerProps {
  onChange: (month: number, year: number) => void;
  defaultInput?: boolean;
}

export interface AddEntriesFormProps {
  initialData?: BaseEntryForm[];
  errors: Record<string, string>[] | null;
  onChange: (entries: BaseEntryForm[]) => void;
  onResetErrors: () => void;
  type: "charge" | "income" | "expense" | "special-expense";
}

export interface UpdateEntryFormProps {
  initialData: UpdateExpenseEntry;
  validationErrors: Record<string, string> | null;
  genericError: string | null;
  onSubmit: (entry: UpdateExpenseEntry) => void;
  onDelete: (entryId: string) => void;
  children?: React.ReactNode;
}

export interface ProjectFormProps {
  onSubmit: (data: SpecialBudgetForm) => void;
  isPending: boolean;
  edit: boolean;
  initialData?: SpecialBudgetForm;
}

export interface AddCategoryFormProps {
  validationErrors: Record<string, string> | null;
  genericError: string | null;
  onSubmit: (category: CategoryFormProps) => void;
  onDelete?: (onCascade: boolean) => void;
  initialData?: string;
  edit?: boolean;
}

export interface CategorySelectProps {
  budgetId: string;
  selectedCategory: string;
  setCategory: (catId: string) => void;
}
