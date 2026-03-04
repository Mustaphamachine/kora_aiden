import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SizePreference = "XS" | "S" | "M" | "L" | "XL";

type PreferencesState = {
  sizePreference: SizePreference;
  setSizePreference: (size: SizePreference) => void;
};

function safeStorage() {
  if (typeof window === "undefined") return undefined;
  return createJSONStorage(() => window.localStorage);
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      sizePreference: "M",
      setSizePreference: (size) => set({ sizePreference: size }),
    }),
    {
      name: "kora-aiden-preferences",
      storage: safeStorage(),
      version: 1,
      partialize: (s) => ({ sizePreference: s.sizePreference }),
    }
  )
);
