import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

interface GoalState {
  value: number;
  set(value: number): void;
}

export const goalStore = createStore<GoalState>()((set) => ({
  value: 2500,
  set(value) {
    set({ value });
    localStorage.setItem('goal', value.toString());
  },
}));

export function useGoalStore(): GoalState;
export function useGoalStore<T>(selector: (state: GoalState) => T, equals?: (a: T, b: T) => boolean): T;
export function useGoalStore(selector?: any, equals?: any) {
  return useStore(goalStore, selector, equals);
}
