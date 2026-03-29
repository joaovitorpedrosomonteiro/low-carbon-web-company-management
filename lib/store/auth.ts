import { create } from "zustand";
import type { User } from "@/lib/api/auth";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isCompanyAdmin: () => boolean;
  isSystemAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    if (typeof window !== "undefined") {
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    set({ user: null });
  },
  isCompanyAdmin: () => get().user?.role === "company_admin",
  isSystemAdmin: () => get().user?.role === "system_admin",
}));
