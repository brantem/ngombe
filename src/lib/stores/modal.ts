import { create } from 'zustand';

export type ModalId = 'histories' | 'target';

type ModalState = {
  id: ModalId | null;
  show: (id: ModalId) => void;
  hide: () => void;
};

export const useModalStore = create<ModalState>()((set) => ({
  id: null,
  show: (id) => set({ id }),
  hide: () => set({ id: null }),
}));
