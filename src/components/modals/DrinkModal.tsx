import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import * as fonts from 'lib/fonts';
import { useModal } from 'lib/hooks';
import { useHistoriesStore } from 'lib/stores';
import { cn } from 'lib/helpers';
import * as constants from 'data/constants';

type Values = {
  value: number;
  time: string;
};

const DrinkModal = () => {
  const modal = useModal<{ timestamp?: string; hideTime: boolean }>('drink');
  const { value, onSubmit } = useHistoriesStore((state) => {
    const _timestamp = modal.data?.timestamp;
    return {
      value: _timestamp ? state.histories[_timestamp] : 100,
      onSubmit: (timestamp: string, value: number) => {
        if (_timestamp) {
          state.update(_timestamp, value);
        } else {
          state.drink(timestamp, value);
        }
      },
    };
  });
  const { register, handleSubmit, reset } = useForm<Values>({ values: { value, time: dayjs().format('HH:mm') } });

  return (
    <Dialog open={modal.isOpen} onClose={modal.onClose} className="fixed inset-0 z-[110] flex items-end">
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />

      <Dialog.Panel className={`h-full w-full flex items-center justify-center px-4 sm:px-0 ${fonts.nunito.className}`}>
        <form
          onSubmit={handleSubmit((data) => {
            let date = new Date();
            if (data.time) {
              const [hour, minute] = data.time.split(':');
              date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
            }
            onSubmit(date.getTime().toString(), data.value);
            modal.onClose();
            reset();
          })}
          className="relative bg-white shadow-sm rounded-xl border border-neutral-100 w-full max-w-sm p-4 space-y-4"
        >
          <div className={cn('grid gap-x-4 items-center', modal.data?.hideTime ? 'grid-cols-1' : 'grid-cols-2')}>
            <label className="flex flex-col">
              <span className="mb-1 text-neutral-500">Amount</span>
              <input
                {...register('value', { required: true, max: constants.MAX_VALUE, valueAsNumber: true })}
                type="number"
                className="text-2xl font-extrabold text-neutral-700 outline-none border rounded-xl h-12 px-3"
                data-testid="drink-modal-value"
              />
            </label>
            {!modal.data?.hideTime && (
              <label className="flex flex-col">
                <span className="mb-1 text-neutral-500">Time</span>
                <input
                  {...register('time')}
                  type="time"
                  className="text-2xl font-extrabold text-neutral-700 outline-none border rounded-xl h-12 px-3"
                  data-testid="drink-modal-time"
                />
              </label>
            )}
          </div>

          <button type="submit" className="bg-cyan-100 text-cyan-500 h-12 px-5 rounded-xl text-lg w-full font-bold">
            Drink
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DrinkModal;
