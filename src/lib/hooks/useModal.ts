import { useAppStore } from 'lib/stores';

export const useModal = <T extends Record<string, any>>(id: string) => {
  return useAppStore((state) => ({
    isOpen: id in state.items,
    data: ((item) => (typeof item === 'boolean' ? undefined : (item as T)))(state.items[id]),
    show: (data?: Record<string, any>) => state.setItem(id, data || true),
    hide: () => state.deleteItem(id),
  }));
};
