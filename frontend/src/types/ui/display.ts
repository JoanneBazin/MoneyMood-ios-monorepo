export interface TotalDataDisplayProps {
  total: number;
  title?: string;
}

export interface TotalMonthlyEntriesProps {
  type: string;
  total: number;
}

export interface DateDisplayProps {
  weekIndex: number;
  setIndex: (index: number) => void;
  isCurrentBudget: boolean;
  oldMonth?: number;
  oldYear?: number;
}

export interface WeekProps {
  start: string;
  end: string;
}
