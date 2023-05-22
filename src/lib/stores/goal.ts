import { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

interface GoalState {
  value: number;
  set(value: number): void;
}

export const goalStore = createStore<GoalState>()(
  persist(
    (set) => ({
      value: 2500,
      set(value) {
        set({ value });
      },
    }),
    { name: 'goal' },
  ),
);

/* c8 ignore start */
const dummy = {
  value: 0,
  set() {},
};

// https://github.com/pmndrs/zustand/issues/1145
export function useGoalStore(): GoalState;
export function useGoalStore<T>(selector: (state: GoalState) => T, equals?: (a: T, b: T) => boolean): T;
export function useGoalStore(selector?: any, equals?: any) {
  const store = useStore(goalStore, selector, equals);
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return isHydrated ? store : selector ? selector(dummy) : dummy;
}
/* c8 ignore stop */
