import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import dayjs from 'dayjs';

import storage from 'lib/storage';
import { goalStore } from 'lib/stores';

interface RecordsState {
  date: string | undefined; // YYYY-MM-DD
  setDate(date: string | undefined): void;

  records: Record<number, number> | (Record<number, number> & { goal: number });
  calcTotalValue(): number;
  drink(timestamp: number, value: number): void;
  update(timestamp: number, value: number): void;
  remove(timestamp: number): void;
}

export const recordsStore = createStore<RecordsState>()((set, get) => ({
  date: undefined,
  async setDate(date) {
    const d = dayjs(date);
    const start = d.startOf('day').valueOf();

    const query = IDBKeyRange.bound(start, d.endOf('day').valueOf());
    const [goalRow, recordRows] = await Promise.all([storage.get('goals', start), storage.getAll('records', query)]);
    const records = recordRows.reduce(
      (records, record) => ({ ...records, [record.timestamp]: record.value }),
      {} as Record<number, number>,
    );

    set({
      date,
      records: date ? { goal: goalRow?.value || 0, ...records } : records,
    });
  },

  records: {},
  calcTotalValue() {
    const { records } = get();
    return Object.keys(records).reduce((value, key) => (key === 'goal' ? value : value + records[key as any]), 0);
  },
  drink(timestamp, value) {
    if (value === 0) return;

    const records = get().records;

    if (value < 0) {
      if (!(timestamp in records)) return;
      records[timestamp] += value;
      if (records[timestamp] <= 0) {
        delete records[timestamp];
        storage.delete('records', timestamp);
      }
    } else {
      if (timestamp in records) {
        records[timestamp] += value;
      } else {
        if (!('goal' in records)) {
          const goal = goalStore.getState().value;
          storage.add('goals', { timestamp: dayjs().startOf('day').valueOf(), value: goal });
        }

        records[timestamp] = value;
      }
      storage.put('records', { timestamp, value: records[timestamp] });
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
