import { create } from "zustand";

interface AppStore {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  pageTitle: "Gérer mes budgets",
  setPageTitle: (title) => set({ pageTitle: title }),
}));
