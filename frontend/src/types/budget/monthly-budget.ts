export interface MonthlyBudgetOptionsProps {
  isCurrent: boolean;
  budgetId: string;
  onError: () => void;
}

export interface updateMonthlyBudgetProps {
  budgetId: string;
  isCurrent: boolean;
}
