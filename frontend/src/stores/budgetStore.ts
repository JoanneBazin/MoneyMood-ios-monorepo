import { BudgetStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      pageTitle: "Gérer mes budgets",
      currentBudget: null,
      weeksInMonth: [],
      fixedCharges: [],
      fixedIncomes: [],
      isBudgetHydrated: false,
      setPageTitle: (title) => set({ pageTitle: title }),
      setCurrentBudget: (budget) => set({ currentBudget: budget }),
      setWeeksInMonth: (weeks) => set({ weeksInMonth: weeks }),
      setFixedCharges: (charges) => set({ fixedCharges: charges }),
      setFixedIncomes: (incomes) => set({ fixedIncomes: incomes }),
      setIsBudgetHydrated: (val) => set({ isBudgetHydrated: val }),
      reset: () => {
        set({
          pageTitle: "Gérer mes budgets",
          currentBudget: null,
          weeksInMonth: [],
          fixedCharges: [],
          fixedIncomes: [],
        }),
          localStorage.removeItem("budget-storage");
      },
    }),
    {
      name: "budget-storage",
      partialize: (state) => ({
        currentBudget: state.currentBudget,
        weeksInMonth: state.weeksInMonth,
        fixedCharges: state.fixedCharges,
        fixedIncomes: state.fixedIncomes,
        isBudgetHydrated: false,
      }),
    }
  )
);
