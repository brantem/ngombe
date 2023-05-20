import { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

interface GoalState {
  goal: number;
  setGoal(goal: number): void;

  isReady: boolean;
}

export const goalStore = createStore<GoalState>()(
  persist(
    (set) => ({
      goal: 0,
      setGoal(goal) {
        set({ goal });
      },

      isReady: true,
    }),
    { name: 'goal' },
  ),
);

/* c8 ignore start */
const dummy = {
  goal: 0,
  setGoal() {},

  isReady: false,
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
