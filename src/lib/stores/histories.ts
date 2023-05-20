import { create } from 'zustand';

interface HistoriesState {
  histories: Record<string, number>;
  calcTotalValue(): number;
  drink(timestamp: number, value: number): void;
  remove(timestamp: string): void;
  reset(): void;
}

export const useHistoriesStore = create<HistoriesState>()((set, get) => ({
  histories: {},
  calcTotalValue() {
    const { histories } = get();
    return Object.keys(histories).reduce((value, key) => value + histories[key], 0);
  },
  drink(timestamp, value) {
    set((state) => {
      const histories = state.histories;
      const key = timestamp.toString();
      const v = (histories[key] || 0) + value;
      if (v > 0) {
        histories[key] = v;
      } else if (key in histories) {
        delete histories[key];
      }
      return { histories };
    });
  },
  remove(timestamp) {
    set((state) => {
      const histories = state.histories;
      delete histories[timestamp.toString()];
      return { histories };
    });
  },
  reset() {
    set({ histories: {} });
  },
}));
