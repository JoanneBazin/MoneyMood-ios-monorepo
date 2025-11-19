export interface Entry {
  id: string;
  name: string;
  amount: number;
}

export interface ExpenseEntry extends Entry {
  weekNumber: number;
  category?: string;
}

export interface SpecialExpenseEntry extends Entry {
  createdAt: string;
  specialCategoryId?: string;
}

export interface BaseEntryForm {
  name: string;
  amount: string | number;
}

export interface UpdateExpenseEntry extends BaseEntryForm {
  id: string;
  category?: string;
}
