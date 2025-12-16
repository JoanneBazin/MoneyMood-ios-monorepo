import { BudgetStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      pageTitle: "Gérer mes budgets",
      currentBudget: null,
      weeksInMonth: [],
      isBudgetHydrated: false,
      setPageTitle: (title) => set({ pageTitle: title }),
      setCurrentBudget: (budget) => set({ currentBudget: budget }),
      setWeeksInMonth: (weeks) => set({ weeksInMonth: weeks }),
      setIsBudgetHydrated: (val) => set({ isBudgetHydrated: val }),
      reset: () => {
        set({
          pageTitle: "Gérer mes budgets",
          currentBudget: null,
          weeksInMonth: [],
        }),
          localStorage.removeItem("budget-storage");
      },
    }),
    {
      name: "budget-storage",
      partialize: (state) => ({
        currentBudget: state.currentBudget,
        weeksInMonth: state.weeksInMonth,
        isBudgetHydrated: false,
      }),
    }
  )
);
