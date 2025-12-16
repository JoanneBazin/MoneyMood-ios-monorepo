import { WeekProps } from "../ui";
import { MonthlyBudget } from "./monthly-budget";

export interface BudgetStore {
  pageTitle: string;
  currentBudget: MonthlyBudget | null;
  weeksInMonth: WeekProps[];
  isBudgetHydrated: boolean;
  setPageTitle: (title: string) => void;
  setCurrentBudget: (budget: MonthlyBudget | null) => void;
  setWeeksInMonth: (weeks: WeekProps[]) => void;
  setIsBudgetHydrated: (val: boolean) => void;
  reset: () => void;
}
