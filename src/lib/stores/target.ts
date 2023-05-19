import { create } from 'zustand';

interface TargetState {
  target: number;
  setTarget(target: number): void;

  isModalOpen: boolean;
  setIsModalOpen(isModalOpen: boolean): void;
}

export const useTargetStore = create<TargetState>()((set, get) => ({
  target: 2612,
  setTarget(target) {
    set({ target });
  },

  isModalOpen: false,
  setIsModalOpen(isModalOpen) {
    set({ isModalOpen });
  },
}));
