import {
  BaseEntryForm,
  CategoryEntryForm,
  SpecialBudgetForm,
  SpecialBudgetOutput,
} from "@shared/schemas";
import { Entry } from "../budget";
import React from "react";

export interface AddMonthlyBudgetFormProps {
  incomes: Entry[];
  charges: Entry[];
}

export interface MonthYearPickerProps {
  onChange: (month: number, year: number) => void;
  defaultInput?: boolean;
}

export interface AddEntriesFormProps {
  initialData?: BaseEntryForm[];
  validationErrors: Record<string, string>[] | null;
  onChange: (entries: BaseEntryForm[]) => void;
  onResetErrors: () => void;
  type: "charges" | "incomes" | "expenses" | "special-expenses";
}

export interface UpdateEntryFormProps {
  initialData: Entry;
  validationErrors: Record<string, string> | null;
  reqError: string | null;
  onSubmit: (entry: BaseEntryForm, entryId: string) => void;
  onDelete: (entryId: string) => void;
  onResetErrors: () => void;
  children?: React.ReactNode;
}

export interface ProjectFormProps {
  onSubmit: (data: SpecialBudgetForm) => void;
  isPending: boolean;
  validationErrors: Record<string, string> | null;
  reqError: string | null;
  onResetErrors: () => void;
  edit: boolean;
  initialData?: SpecialBudgetOutput;
}

export interface CategoryFormProps {
  validationErrors: Record<string, string> | null;
  reqError: string | null;
  onResetErrors: () => void;
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
