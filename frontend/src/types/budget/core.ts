import { WeekProps } from "../ui";
import { Entry } from "./entries";
import { MonthlyBudget } from "./monthly-budget";

export interface BudgetStore {
  pageTitle: string;
  currentBudget: MonthlyBudget | null;
  weeksInMonth: WeekProps[];
  fixedIncomes: Entry[];
  fixedCharges: Entry[];
  isBudgetHydrated: boolean;
  setPageTitle: (title: string) => void;
  setCurrentBudget: (budget: MonthlyBudget | null) => void;
  setWeeksInMonth: (weeks: WeekProps[]) => void;
  setFixedCharges: (charges: Entry[]) => void;
  setFixedIncomes: (incomes: Entry[]) => void;
  setIsBudgetHydrated: (val: boolean) => void;
  reset: () => void;
}
