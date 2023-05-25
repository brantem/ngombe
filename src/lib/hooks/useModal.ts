import { useModalStore } from 'lib/stores';

export const useModal = <T extends Record<string, any>>(id: string) => {
  return useModalStore((state) => ({
    isOpen: state.items.has(id),
    data: ((item) => (typeof item === 'boolean' ? undefined : (item as T)))(state.items.get(id)),
    show: (data?: Record<string, any>) => state.show(id, data),
    hide: () => state.hide(id),
  }));
};
