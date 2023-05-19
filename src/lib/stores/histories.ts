import { create } from 'zustand';

import { History } from 'types/history';

interface HistoriesState {
  histories: History[];
  calcTotalValue(): number;
  drink(value: number): void;
  reset(): void;

  isModalOpen: boolean;
  setIsModalOpen(isModalOpen: boolean): void;
}

export const useHistoriesStore = create<HistoriesState>()((set, get) => ({
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

  isModalOpen: false,
  setIsModalOpen(isModalOpen) {
    set({ isModalOpen });
  },
}));
