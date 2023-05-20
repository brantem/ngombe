import { create } from 'zustand';

interface GoalState {
  goal: number;
  setGoal(goal: number): void;
}

export const useGoalStore = create<GoalState>()((set) => ({
  goal: 2500,
  setGoal(goal) {
    set({ goal });
  },
}));
