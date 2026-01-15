import { User } from "@shared/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;

  pageTitle: string;
  setPageTitle: (title: string) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
      },

      pageTitle: "Gérer mes budgets",
      setPageTitle: (title) => set({ pageTitle: title }),
    }),
    {
      name: "app-storage",
      partialize: (state): Pick<AppStore, "user"> => ({ user: state.user }),
    }
  )
);
