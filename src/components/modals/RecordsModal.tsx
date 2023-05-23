import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import dayjs from 'dayjs';

import * as fonts from 'lib/fonts';
import { useModal } from 'lib/hooks';
import { useDateStore, useGoalStore, useRecordsStore } from 'lib/stores';
import { calcPercentage } from 'lib/helpers';

export const Stats = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { date, setDate } = useDateStore((state) => ({ date: state.value, setDate: state.set }));
  const goal = useGoalStore((state) => state.value);
  const totalValue = useRecordsStore((state) => state.calcTotalValue());

  return (
    <div className="pt-4 text-center flex flex-col items-center">
      <label className="cursor-pointer relative">
        <input
          ref={inputRef}
          type="date"
          className="sr-only left-0"
          value={dayjs(date).format('YYYY-MM-DD')}
          onChange={(e) => setDate(e.target.value)}
          max={dayjs().format('YYYY-MM-DD')}
        />
        <div className="flex items-center justify-center" onClick={() => inputRef.current?.showPicker()}>
          <h1 className="text-2xl font-extrabold">{dayjs(date).format('D MMM YYYY')}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-2 mb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </div>
      </label>
      <p className="text-neutral-400 mt-1">
        {goal > 0 ? (
          <>
            {totalValue}/{goal}ml &#183; {calcPercentage(totalValue, goal)}%
          </>
        ) : (
          <>{totalValue}ml</>
        )}
      </p>
    </div>
  );
};

export const MissedDrink = () => {
  const modal = useModal('drink');

  return (
    <div className="flex justify-center mx-auto mt-4 mb-6">
      <button
        className="flex items-center rounded-full bg-cyan-100 text-cyan-500 pl-2 pr-3 py-1 text-sm"
        onClick={modal.onOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        <span>Missed Drink</span>
      </button>
    </div>
  );
};

type RecordProps = {
  timestamp: number;
  value: number;
  isLast?: boolean;
};

export const Record = ({ timestamp, value, isLast }: RecordProps) => {
  const modal = useModal('drink');
  const goal = useGoalStore((state) => state.value);
  const remove = useRecordsStore((state) => state.remove);

  return (
    <li data-testid="records-modal-record">
      <div className="px-4 flex justify-between items-center">
        <button
          onClick={() => modal.onOpen({ timestamp, hideTime: true })}
          className="cursor-pointer"
          data-testid="records-modal-update"
        >
          <span className="font-bold text-cyan-500 text-lg">{value}ml</span>{' '}
          {goal > 0 && (
            <span className="text-neutral-300" data-testid="records-modal-recor-percentage">
              +{calcPercentage(value, goal)}%
            </span>
          )}
        </button>
        <div className="space-x-3 flex items-center">
          <span className="text-neutral-400">{dayjs(timestamp).format('H:mm')}</span>
          <button
            className="rounded-full h-6 w-6 bg-rose-100 text-rose-500 flex items-center justify-center"
            onClick={() => remove(timestamp)}
            data-testid="records-modal-remove"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
            </svg>
          </button>
        </div>
      </div>
      {/* c8 ignore next */ !isLast && <hr className="mt-3 w-[85%] mx-auto" />}
    </li>
  );
};

const RecordsModal = () => {
  const modal = useModal('records');
  const setDate = useDateStore((state) => state.set);
  const records = useRecordsStore((state) => state.records);
  const keys = Object.keys(records);

  const handleClose = () => {
    modal.onClose();
    setDate(undefined);
  };

  return (
    <Dialog open={modal.isOpen} onClose={handleClose} className="fixed inset-0 z-[100] flex items-end">
      <div className="fixed inset-0" aria-hidden="true" />

      <div className="max-h-[calc(100%-68px)] h-[50rem] w-full max-w-lg mx-auto transition-[padding-bottom]">
        <Dialog.Panel className={`h-full w-full ${fonts.nunito.className}`}>
          <div
            className="relative bg-white shadow-sm rounded-t-xl border border-neutral-100 h-full w-full overflow-hidden flex flex-col"
            style={{ animationDuration: '2.5s' }}
          >
            <button className="absolute top-4 right-4" onClick={handleClose} data-testid="records-modal-close">
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

            <Stats />

            <MissedDrink />

            {keys.length === 0 ? (
              <div className="flex items-center justify-center flex-1 text-neutral-300">Nothing to see here</div>
            ) : (
              <ul className="space-y-3 overflow-y-auto pb-3">
                {keys
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((key, i) => {
                    const timestamp = parseInt(key);
                    return (
                      <Record
                        key={timestamp}
                        timestamp={timestamp}
                        value={records[timestamp]}
                        isLast={i === keys.length - 1}
                      />
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
