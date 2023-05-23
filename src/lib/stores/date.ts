import { create } from 'zustand';

import { goalStore, recordsStore } from 'lib/stores';

type DateState = {
  value: string | undefined;
  set(value: string | undefined): void;
};

// it didn't work when I used useState for this
export const useDateStore = create<DateState>()((set) => ({
  value: undefined,
  set(value) {
    set({ value });
    goalStore.getState().fetch(value);
    recordsStore.getState().fetch(value);
  },
}));
