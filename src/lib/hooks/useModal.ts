import { useModalStore, ModalId } from 'lib/stores';

export const useModal = <T extends Record<string, any>>(id: ModalId) => {
  return useModalStore((state) => {
    const item = state.items.get(id);
    return {
      isOpen: !!item,
      data: typeof item === 'boolean' ? undefined : (item as T),
      onOpen: (data?: Record<string, any>) => state.show(id, data),
      onClose: () => state.hide(id),
    };
  });
};
