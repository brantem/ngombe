import dayjs from 'dayjs';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

import storage from 'lib/storage';

interface GoalState {
  fetch(date?: string): void;

  value: number;
  set(date: string | undefined, value: number): void;
}

export const goalStore = createStore<GoalState>()((set) => ({
  async fetch(date) {
    set({
      value: date
        ? (await storage.get('goals', dayjs(date).startOf('day').valueOf()))?.value || 0
        : parseInt(localStorage.getItem('goal') || '2500'),
    });
  },

  value: 2500,
  set(date, value) {
    set({ value });
    const d = dayjs(date);
    if (d.isSame(dayjs())) localStorage.setItem('goal', value.toString());
    storage.put('goals', { timestamp: d.startOf('day').valueOf(), value });
  },
}));

export function useGoalStore(): GoalState;
export function useGoalStore<T>(selector: (state: GoalState) => T, equals?: (a: T, b: T) => boolean): T;
export function useGoalStore(selector?: any, equals?: any) {
  return useStore(goalStore, selector, equals);
}
