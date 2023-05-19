import { create } from 'zustand';

export type ModalId = 'drink' | 'histories' | 'target';

type ModalState = {
  items: Map<ModalId, boolean | Record<string, any>>;
  show: (id: ModalId, data?: boolean | Record<string, any>) => void;
  hide: (id: ModalId) => void;
};

export const useModalStore = create<ModalState>()((set) => ({
  items: new Map(),
  show(id, data = true) {
    set((state) => ({ items: new Map(state.items).set(id, data) }));
  },
  hide(id) {
    set((state) => {
      const items = new Map(state.items);
      items.delete(id);
      return { items };
    });
  },
}));
