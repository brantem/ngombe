import { Dialog } from '@headlessui/react';

import * as fonts from 'lib/fonts';
import { useHistoriesStore } from 'lib/stores';

const HistoriesModal = () => {
  const { isOpen, onClose } = useHistoriesStore((state) => ({
    isOpen: state.isModalOpen,
    onClose: () => state.setIsModalOpen(false),
  }));

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-[100] flex items-end">
      <div className="h-1/2 w-full p-4">
        <Dialog.Panel className={`h-full w-full ${fonts.nunito.className}`}>
          <div className="relative bg-white shadow-md rounded-lg p-4 space-x-1 border border-neutral-100 h-full w-full">
            <button className="absolute top-4 right-4" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h1 className="text-2xl font-extrabold text-center">Histories</h1>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default HistoriesModal;
