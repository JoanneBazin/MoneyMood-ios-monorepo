import { CategoryFormProps, SpecialBudgetForm } from "@shared/schemas";
import { BaseEntryForm, UpdateExpenseEntry } from "../budget";

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
  onDelete?: () => void;
  initialData?: string;
  edit?: boolean;
}
