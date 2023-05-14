import { create } from 'zustand';

import { History } from 'types/history';

interface HistoriesState {
  target: number;
  histories: History[];

  calcTotalValue(): number;
  drink(value: number): void;
  reset(): void;
}

export const useHistoriesStore = create<HistoriesState>()((set, get) => ({
  target: 2612,
  histories: [],

  calcTotalValue() {
    return get().histories.reduce((value, history) => value + history.value, 0);
  },
  drink(value) {
    set((state) => ({ histories: [...state.histories, { value, timestamp: Date.now() }] }));
  },
  reset() {
    set({ histories: [] });
  },
}));
