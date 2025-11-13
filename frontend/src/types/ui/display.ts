export interface TotalDataDisplayProps {
  total: number;
  title?: string;
}

export interface RemainingBudgetDisplayProps {
  type: string;
  total: number;
  base?: boolean;
}

export interface DateDisplayProps {
  weekIndex: number;
  setIndex: (index: number) => void;
  isCurrentBudget: boolean;
  oldMonth?: number;
  oldYear?: number;
}

export interface WeekProps {
  start: Date;
  end: Date;
}
