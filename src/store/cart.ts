import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  imageSrc?: string;
  size?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "key">, quantity?: number) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  setSize: (key: string, size: string) => void;
  clear: () => void;
  totalItems: () => number;
};

function buildKey(id: string, size?: string) {
  return `${id}__${size ?? ""}`;
}

function safeStorage() {
  if (typeof window === "undefined") return undefined;
  return createJSONStorage(() => window.localStorage);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const key = buildKey(item.id, item.size);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, key, quantity }] };
        }),
      removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),
      setSize: (key, size) =>
        set((state) => {
          const target = state.items.find((i) => i.key === key);
          if (!target) return { items: state.items };

          const updatedKey = buildKey(target.id, size);
          const updated = { ...target, size, key: updatedKey };

          const without = state.items.filter((i) => i.key !== key);
          const mergeTarget = without.find((i) => i.key === updatedKey);

          if (mergeTarget) {
            return {
              items: without
                .filter((i) => i.key !== updatedKey)
                .concat({ ...mergeTarget, quantity: mergeTarget.quantity + updated.quantity }),
            };
          }

          return { items: without.concat(updated) };
        }),
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "kora-aiden-cart",
      storage: safeStorage(),
      version: 1,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
