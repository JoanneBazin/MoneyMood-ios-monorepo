export interface LastMonthlyBudget {
  id: string;
  year: number;
  month: number;
  remainingBudget: number;
}

export interface HistoryCardProps {
  data: LastMonthlyBudget;
  onSelect: (budgetId: string) => void;
}
