import { create } from 'zustand';

type ModalState = {
  items: Map<string, boolean | Record<string, any>>;
  show: (id: string, data?: boolean | Record<string, any>) => void;
  hide: (id: string) => void;
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
