export interface Entry {
  id: string;
  name: string;
  amount: number;
}

export interface ExpenseEntry extends Entry {
  cashed: boolean;
}

export interface MonthlyExpenseEntry extends ExpenseEntry {
  weekNumber: number;
}

export interface SpecialExpenseEntry extends ExpenseEntry {
  createdAt: string;
  specialCategoryId?: string | null;
}
