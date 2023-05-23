import { Dialog } from '@headlessui/react';
import { useForm, useFormState } from 'react-hook-form';
import dayjs from 'dayjs';

import * as fonts from 'lib/fonts';
import { useModal } from 'lib/hooks';
import { useDateStore, useRecordsStore } from 'lib/stores';
import { cn } from 'lib/helpers';
import * as constants from 'data/constants';

type Data = {
  timestamp?: number;
  hideTime: boolean;
};

type Values = {
  value: number;
  time: string;
};

const DrinkModal = () => {
  const modal = useModal<Data>('drink');
  const date = useDateStore((state) => state.value);
  const { values, upsert } = useRecordsStore((state) => {
    const _timestamp = modal.data?.timestamp;
    return {
      values: { value: _timestamp ? state.records[_timestamp] : 100, time: dayjs().format('HH:mm') },
      upsert: (timestamp: number, value: number) => {
        if (_timestamp) {
          state.update(_timestamp, value);
        } else {
          state.drink(timestamp, value);
        }
      },
    };
  });
  const { register, handleSubmit, reset, control } = useForm<Values>({ values });
  const { errors } = useFormState({ control });

  const hideTime = modal.data?.hideTime;

  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => {
        modal.onClose();
        reset();
      }}
      className="fixed inset-0 z-[110] flex items-end"
    >
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />

      <Dialog.Panel className={`h-full w-full flex items-center justify-center px-4 sm:px-0 ${fonts.nunito.className}`}>
        <form
          onSubmit={handleSubmit((data) => {
            let d = date ? dayjs(date).toDate() : new Date();
            if (data.time) {
              const [hour, minute] = data.time.split(':');
              d.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
            }
            upsert(d.getTime(), data.value);
            modal.onClose();
            reset();
          })}
          className="relative bg-white shadow-sm rounded-xl border border-neutral-100 p-4 space-y-4"
        >
          <div className={cn('grid gap-x-4 items-center', modal.data?.hideTime ? 'grid-cols-1' : 'grid-cols-2')}>
            <label className="flex flex-col">
              <span className="mb-1 text-neutral-500">Amount</span>
              <input
                {...register('value', { required: true, max: constants.MAX_VALUE, valueAsNumber: true })}
                type="number"
                className={cn(
                  'text-2xl font-extrabold text-neutral-700 outline-none rounded-xl h-12 px-3 border-2 border-neutral-200',
                  !hideTime ? 'w-36' : 'w-[304px] text-center',
                  errors.value && 'border-red-500',
                )}
                data-testid="drink-modal-value"
              />
            </label>
            {!hideTime && (
              <label className="flex flex-col">
                <span className="mb-1 text-neutral-500">Time</span>
                <input
                  {...register('time', {
                    validate: (v) => {
                      if (date) return true;
                      const [hour, minute] = v.split(':');
                      const d = new Date();
                      d.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
                      return d.getTime() <= Date.now();
                    },
                  })}
                  type="time"
                  className={cn(
                    'text-2xl font-extrabold text-neutral-700 outline-none rounded-xl h-12 px-3 border-2 border-neutral-200 w-36',
                    errors.time && 'border-red-500',
                  )}
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
