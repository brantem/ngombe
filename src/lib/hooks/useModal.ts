import { useModalStore } from 'lib/stores';

export const useModal = <T extends Record<string, any>>(id: string) => {
  return useModalStore((state) => {
    const item = state.items.get(id);
    return {
      isOpen: !!item,
      data: typeof item === 'boolean' ? undefined : (item as T),
      show: (data?: Record<string, any>) => state.show(id, data),
      hide: () => state.hide(id),
    };
  });
};
