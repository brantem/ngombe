import { create } from 'zustand';

interface TargetState {
  target: number;
  setTarget(target: number): void;
}

export const useTargetStore = create<TargetState>()((set, get) => ({
  target: 2500,
  setTarget(target) {
    set({ target });
  },
}));
