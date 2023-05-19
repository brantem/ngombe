import { Dialog } from '@headlessui/react';
import dayjs from 'dayjs';

import * as fonts from 'lib/fonts';
import { useTargetStore, useHistoriesStore } from 'lib/stores';

const HistoriesModal = () => {
  const target = useTargetStore((state) => state.target);
  const { histories, totalValue, isOpen, onClose } = useHistoriesStore((state) => ({
    histories: state.histories,
    totalValue: state.calcTotalValue(),
    isOpen: state.isModalOpen,
    onClose: () => state.setIsModalOpen(false),
  }));

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-[100] flex items-end">
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />

      <div className="max-h-[90%] h-full w-full max-w-lg mx-auto">
        <Dialog.Panel className={`h-full w-full ${fonts.nunito.className}`}>
          <div className="relative bg-white shadow-sm rounded-t-xl space-x-1 border border-neutral-100 h-full w-full overflow-hidden flex flex-col">
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

            <div className="pt-4 text-center">
              <h1 className="text-2xl font-extrabold">{dayjs().format('DD MMM YYYY')}</h1>
              <p className="text-neutral-400 mt-1">
                {totalValue}/{target}ml &#183; {Math.round((totalValue / target) * 100)}%
              </p>
            </div>

            <div className="flex justify-center mx-auto mt-4 mb-6">
              <button className="flex items-center rounded-full bg-teal-100 text-teal-500 pl-2 pr-3 py-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                <span>Missed Drink</span>
              </button>
            </div>

            <ul className="space-y-3 overflow-y-auto">
              {histories.map((history, i) => (
                <li key={history.timestamp}>
                  <div className="px-4 flex justify-between items-center">
                    <span>
                      <span className="font-bold text-teal-500 text-lg">{history.value}ml</span>{' '}
                      <span className="text-neutral-300">+{Math.round((history.value / target) * 100)}%</span>
                    </span>
                    <span className="text-neutral-400">{dayjs(history.timestamp).format('H:mm')}</span>
                  </div>
                  {i !== histories.length && <hr className="mt-3 w-[85%] mx-auto" />}
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default HistoriesModal;
