import { useModalStore, ModalId } from 'lib/stores';

export const useModal = (id: ModalId) => {
  return useModalStore((state) => ({
    isOpen: state.id === id,
    onOpen: () => state.show(id),
    onClose: state.hide,
  }));
};
