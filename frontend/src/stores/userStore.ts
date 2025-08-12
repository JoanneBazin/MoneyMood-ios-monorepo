import { UserStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
      partialize: (state): Pick<UserStore, "user"> => ({ user: state.user }),
    }
  )
);
