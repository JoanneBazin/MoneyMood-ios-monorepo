import { User } from "@shared/types/index";

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
