import { create } from 'zustand';

interface HistoriesState {
  histories: Record<string, number>;
  calcTotalValue(): number;
  drink(timestamp: string, value: number): void;
  update(timestamp: string, value: number): void;
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
    if (value === 0) return;

    const histories = get().histories;

    const v = (histories[timestamp] || 0) + value;
    if (v > 0) {
      histories[timestamp] = v;
    } else {
      if (!(timestamp in histories)) return;
      delete histories[timestamp];
    }

    set({ histories });
  },
  update(timestamp, value) {
    if (value === 0) return;

    const histories = get().histories;
    if (!(timestamp in histories)) return;

    if (value > 0) {
      histories[timestamp] = value;
    } else {
      histories[timestamp] += value;
    }

    set({ histories });
  },
  remove(timestamp) {
    const histories = get().histories;
    if (!(timestamp in histories)) return;
    delete histories[timestamp];
    set({ histories });
  },
  reset() {
    set({ histories: {} });
  },
}));
