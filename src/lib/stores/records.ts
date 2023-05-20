import { create } from 'zustand';

interface RecordsState {
  records: Record<string, number>;
  calcTotalValue(): number;
  drink(timestamp: string, value: number): void;
  update(timestamp: string, value: number): void;
  remove(timestamp: string): void;
  reset(): void;
}

export const useRecordsStore = create<RecordsState>()((set, get) => ({
  records: {},
  calcTotalValue() {
    const { records } = get();
    return Object.keys(records).reduce((value, key) => value + records[key], 0);
  },
  drink(timestamp, value) {
    if (value === 0) return;

    const records = get().records;

    const v = (records[timestamp] || 0) + value;
    if (v > 0) {
      records[timestamp] = v;
    } else {
      if (!(timestamp in records)) return;
      delete records[timestamp];
    }

    set({ records });
  },
  update(timestamp, value) {
    if (value === 0) return;

    const records = get().records;
    if (!(timestamp in records)) return;

    if (value > 0) {
      records[timestamp] = value;
    } else {
      records[timestamp] += value;
    }

    set({ records });
  },
  remove(timestamp) {
    const records = get().records;
    if (!(timestamp in records)) return;
    delete records[timestamp];
    set({ records });
  },
  reset() {
    set({ records: {} });
  },
}));
