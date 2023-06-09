import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import dayjs from 'dayjs';

import storage from 'lib/storage';
import { goalStore } from 'lib/stores/goal';

interface RecordsState {
  fetch(date?: string): void;

  records: Record<number, number>;
  calcTotalValue(): number;
  drink(timestamp: number, value: number): void;
  update(timestamp: number, value: number): void;
  remove(timestamp: number): void;
}

export const recordsStore = createStore<RecordsState>()((set, get) => ({
  async fetch(date) {
    const d = dayjs(date);
    const query = IDBKeyRange.bound(d.startOf('day').valueOf(), d.endOf('day').valueOf());
    set({
      records: (await storage.getAll('records', query)).reduce(
        (records, record) => ({ ...records, [record.timestamp]: record.value }),
        {} as Record<number, number>,
      ),
    });
  },

  records: {},
  calcTotalValue() {
    const { records } = get();
    return Object.keys(records).reduce((value, key) => value + records[key as any], 0);
  },
  drink(timestamp, value) {
    if (value === 0) return;

    const records = get().records;
    let shouldSetDrink = false;

    if (value < 0) {
      if (!(timestamp in records)) return;
      records[timestamp] += value;
      if (records[timestamp] <= 0) {
        delete records[timestamp];
        storage.delete('records', timestamp);
      } else {
        storage.put('records', { timestamp, value: records[timestamp] });
      }
    } else {
      if (timestamp in records) {
        records[timestamp] += value;
      } else {
        shouldSetDrink = Object.keys(records).length === 0;
        records[timestamp] = value;
      }
      storage.put('records', { timestamp, value: records[timestamp] });
    }

    if (shouldSetDrink) {
      const { value, set } = goalStore.getState();
      set(dayjs(timestamp).startOf('day').format('YYYY-MM-DD'), value);
    }

    set({ records });
  },
  update(timestamp, value) {
    if (value === 0) return;

    const records = get().records;
    if (!(timestamp in records)) return;

    if (value < 0) {
      records[timestamp] += value;
    } else {
      records[timestamp] = value;
    }

    storage.put('records', { timestamp, value: records[timestamp] });
    set({ records });
  },
  remove(timestamp) {
    const records = get().records;
    if (!(timestamp in records)) return;

    delete records[timestamp];

    storage.delete('records', timestamp);
    set({ records });
  },
}));

export function useRecordsStore(): RecordsState;
export function useRecordsStore<T>(selector: (state: RecordsState) => T, equals?: (a: T, b: T) => boolean): T;
export function useRecordsStore(selector?: any, equals?: any) {
  return useStore(recordsStore, selector, equals);
}
