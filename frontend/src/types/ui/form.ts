import {
  BaseEntryForm,
  CategoryEntryForm,
  SpecialBudgetForm,
} from "@shared/schemas";
import { Entry } from "../budget";
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
  type: "charges" | "incomes" | "expense" | "special-expense";
}

export interface UpdateEntryFormProps {
  initialData: Entry;
  validationErrors: Record<string, string> | null;
  genericError: string | null;
  onSubmit: (entry: BaseEntryForm, entryId: string) => void;
  onDelete: (entryId: string) => void;
  children?: React.ReactNode;
}

export interface ProjectFormProps {
  onSubmit: (data: SpecialBudgetForm) => void;
  isPending: boolean;
  isError: boolean;
  edit: boolean;
  initialData?: SpecialBudgetForm;
}

export interface CategoryFormProps {
  validationErrors: Record<string, string> | null;
  genericError: string | null;
  onSubmit: (category: CategoryEntryForm) => void;
  isPending?: boolean;
  onDelete?: (onCascade: boolean) => void;
  initialData?: string;
  edit?: boolean;
}

export interface CategorySelectProps {
  budgetId: string;
  selectedCategory: string;
  setCategory: (catId: string) => void;
}
