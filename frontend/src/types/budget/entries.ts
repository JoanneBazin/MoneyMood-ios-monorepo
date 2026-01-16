export interface Entry {
  id: string;
  name: string;
  amount: number;
}

export interface ExpenseEntry extends Entry {
  weekNumber: number;
  cashed: boolean;
}

export interface SpecialExpenseEntry extends Entry {
  createdAt: string;
  specialCategoryId?: string | null;
  cashed: boolean;
}
