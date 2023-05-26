import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import dayjs from 'dayjs';

import Input from 'components/Input';

import * as fonts from 'lib/fonts';
import { useModal } from 'lib/hooks';
import { useAppStore, useRecordsStore } from 'lib/stores';
import { cn } from 'lib/helpers';
import * as constants from 'data/constants';

type Data = {
  timestamp?: number;
  hideTime: boolean;
};

const DrinkModal = () => {
  const modal = useModal<Data>('drink');
  const hideTime = modal.data?.hideTime;
  const date = useAppStore((state) => state.date);
  const { values, upsert } = useRecordsStore((state) => {
    const _timestamp = modal.data?.timestamp;
    return {
      values: { value: _timestamp ? state.records[_timestamp] : 100, time: dayjs(_timestamp).format('HH:mm') },
      upsert: (timestamp: number, value: number) => {
        if (_timestamp) {
          state.update(_timestamp, value);
        } else {
          state.drink(timestamp, value);
        }
      },
    };
  });

  const [value, setValue] = useState<string>();
  const [time, setTime] = useState<string>(values.time);

  const v = value === undefined ? values.value : parseInt(value);

  const isValueValid = (value: number) => value <= constants.MAX_VALUE;

  const isTimeValid = (time: string) => {
    if (date) return true;
    const [hour, minute] = time.split(':');
    const d = new Date();
    d.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
    return d.getTime() <= Date.now();
  };

  const reset = () => {
    setValue(undefined);
  };

  return (
    <Dialog
      open={modal.isOpen}
      /* c8 ignore next 4 */
      onClose={() => {
        modal.hide();
        reset();
      }}
      className="fixed inset-0 z-[110] flex items-end"
    >
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />

      <Dialog.Panel className={`h-full w-full flex items-center justify-center px-4 sm:px-0 ${fonts.nunito.className}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let d = date ? dayjs(date).toDate() : new Date();
            if (time) {
              const [hour, minute] = time.split(':');
              d.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
            }
            upsert(d.getTime(), v);
            modal.hide();
            reset();
          }}
          className="relative bg-white shadow-sm rounded-xl border border-neutral-100 p-4 space-y-4"
        >
          <div className={cn('grid gap-x-4 items-center', hideTime ? 'grid-cols-1' : 'grid-cols-2')}>
            <Input
              label="Amount"
              className={/* c8 ignore next */ !hideTime ? 'w-36' : 'w-[304px] text-center'}
              type="number"
              data-testid="drink-modal-value"
              value={value === undefined ? values.value : value}
              onKeyDown={(e) => e.key === '-' && setValue('-')}
              onChange={(e) => setValue(e.target.value.slice(value === undefined ? values.value.toString().length : 0))}
              max={constants.MAX_VALUE}
              autoFocus
              required
              invalid={!isValueValid(v)}
            />

            {!hideTime && (
              <Input
                label="Time"
                className="w-36"
                type="time"
                data-testid="drink-modal-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                max={date ? undefined : values.time}
                required
                invalid={!isTimeValid(time)}
              />
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
