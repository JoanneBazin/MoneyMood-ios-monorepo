import { BudgetStore } from "@/types";
import { create } from "zustand";

export const useBudgetStore = create<BudgetStore>((set) => ({
  pageTitle: "Gérer mes budgets",
  setPageTitle: (title) => set({ pageTitle: title }),
  reset: () => {
    set({
      pageTitle: "Gérer mes budgets",
    }),
      localStorage.removeItem("budget-storage");
  },
}));
