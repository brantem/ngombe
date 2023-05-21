import { Dialog } from '@headlessui/react';
import dayjs from 'dayjs';

import * as fonts from 'lib/fonts';
import { cn } from 'lib/helpers';
import { useModal } from 'lib/hooks';
import { useGoalStore, useRecordsStore } from 'lib/stores';

const RecordsModal = () => {
  const modal = useModal('records');
  const drinkModal = useModal('drink');
  const goal = useGoalStore((state) => state.goal);
  const { records, remove, totalValue } = useRecordsStore((state) => ({
    records: state.records,
    remove: state.remove,
    totalValue: state.calcTotalValue(),
  }));
  const keys = Object.keys(records);

  const percentage = Math.round((totalValue / goal) * 100);
  const showWave = percentage > 5;

  return (
    <Dialog open={modal.isOpen} onClose={modal.onClose} className="fixed inset-0 z-[100] flex items-end">
      <div className="fixed inset-0" aria-hidden="true" />

      <div
        className={cn(
          'max-h-[calc(100%-68px)] h-[50rem] w-full max-w-lg mx-auto',
          /* c8 ignore next */ showWave && 'pb-4',
        )}
      >
        <Dialog.Panel className={`h-full w-full ${fonts.nunito.className}`}>
          <div
            className={cn(
              'relative bg-white shadow-sm rounded-t-xl border border-neutral-100 h-full w-full overflow-hidden flex flex-col',
              /* c8 ignore next */ showWave && 'wave',
            )}
            style={{ animationDuration: '2.5s' }}
          >
            <button className="absolute top-4 right-4" onClick={modal.onClose}>
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
              <h1 className="text-2xl font-extrabold">{dayjs().format('D MMM YYYY')}</h1>
              <p className="text-neutral-400 mt-1">
                {totalValue}/{goal}ml &#183; {percentage}%
              </p>
            </div>

            <div className="flex justify-center mx-auto mt-4 mb-6">
              <button
                className="flex items-center rounded-full bg-cyan-100 text-cyan-500 pl-2 pr-3 py-1 text-sm"
                onClick={drinkModal.onOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                <span>Missed Drink</span>
              </button>
            </div>

            {keys.length === 0 ? (
              <div className="flex items-center justify-center flex-1 text-neutral-300">Nothing to see here</div>
            ) : (
              <ul className={cn('space-y-3 overflow-y-auto', /* c8 ignore next */ showWave ? 'pb-12' : 'pb-3')}>
                {keys
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((key, i) => {
                    const timestamp = parseInt(key);
                    return (
                      <li key={timestamp} data-testid="records-modal-item">
                        <div className="px-4 flex justify-between items-center">
                          <button
                            onClick={() => drinkModal.onOpen({ timestamp, hideTime: true })}
                            className="cursor-pointer"
                            data-testid="records-modal-update"
                          >
                            <span className="font-bold text-cyan-500 text-lg">{records[timestamp]}ml</span>{' '}
                            <span className="text-neutral-300">+{Math.round((records[timestamp] / goal) * 100)}%</span>
                          </button>
                          <div className="space-x-3 flex items-center">
                            <span className="text-neutral-400">{dayjs(timestamp).format('H:mm')}</span>
                            <button
                              className="rounded-full h-6 w-6 bg-rose-100 text-rose-500 flex items-center justify-center"
                              onClick={() => remove(timestamp)}
                              data-testid="records-modal-remove"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                              >
                                <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {/* c8 ignore next */ i !== keys.length - 1 && <hr className="mt-3 w-[85%] mx-auto" />}
                      </li>
                    );
                  })}
                <li className="text-center text-neutral-300">That&apos;s all!</li>
              </ul>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RecordsModal;
