import { useBudgetStore } from "@/stores/budgetStore";
import { getWeeksInMonth } from "./weeks-helpers";
import { MonthlyBudget } from "@shared/schemas";

export const hydrateBudgetStore = (budget: MonthlyBudget) => {
  const { setCurrentBudget, setWeeksInMonth } = useBudgetStore.getState();

  setCurrentBudget(budget);
  setWeeksInMonth(getWeeksInMonth(budget.year, budget.month));
};
