import { create } from 'zustand';

import { goalStore, recordsStore } from 'lib/stores';

type AppState = {
  items: Record<string, any>;
  setItem: (key: string, value: any) => void;
  deleteItem: (key: string) => void;

  date: string | undefined; // YYYY-MM-DD
  setDate(date: string | undefined): void;
};

export const useAppStore = create<AppState>()((set) => ({
  items: {},
  setItem(key, value) {
    set((state) => ({ items: { ...state.items, [key]: value } }));
  },
  deleteItem(key) {
    set((state) => {
      const items = state.items;
      delete items[key];
      return { items };
    });
  },

  date: undefined,
  setDate(date) {
    set({ date });
    goalStore.getState().fetch(date);
    recordsStore.getState().fetch(date);
  },
}));
