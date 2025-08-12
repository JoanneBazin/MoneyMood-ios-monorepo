import { BudgetEntry, MonthlyBudget } from "@shared/schemas";
import { WeekProps } from "../ui";

export interface BudgetStore {
  pageTitle: string;
  currentBudget: MonthlyBudget | null;
  weeksInMonth: WeekProps[];
  fixedIncomes: BudgetEntry[];
  fixedCharges: BudgetEntry[];
  isBudgetHydrated: boolean;
  setPageTitle: (title: string) => void;
  setCurrentBudget: (budget: MonthlyBudget | null) => void;
  setWeeksInMonth: (weeks: WeekProps[]) => void;
  setFixedCharges: (charges: BudgetEntry[]) => void;
  setFixedIncomes: (incomes: BudgetEntry[]) => void;
  setIsBudgetHydrated: (val: boolean) => void;
  reset: () => void;
}
