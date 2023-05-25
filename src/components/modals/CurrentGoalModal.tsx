import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

import { useGoalStore } from 'lib/stores';
import { useDebounce, useModal } from 'lib/hooks';
import * as fonts from 'lib/fonts';
import * as constants from 'data/constants';
import { cn } from 'lib/helpers';

const CurrentGoalModal = () => {
  const modal = useModal('current-goal');
  const { goal, setGoal } = useGoalStore((state) => ({ goal: state.value, setGoal: state.set }));

  const [value, setValue] = useState<number>();
  const isDirty = value !== undefined;
  const v = isDirty ? value : goal;

  const isValueValid = (value: number) => value >= 100 && value <= constants.MAX_VALUE;

  const debouncedValue = useDebounce(value, 500);
  useEffect(() => {
    if (!debouncedValue) return;
    if (!isValueValid(debouncedValue)) return;
    setGoal(undefined, debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Dialog
      open={modal.isOpen}
      /* c8 ignore next 4 */
      onClose={() => {
        modal.hide();
        setValue(undefined);
      }}
      className="fixed right-0 top-0 left-0 z-[100]"
    >
      <div className="fixed inset-0 z-10" aria-hidden="true" />

      <div className="relative max-w-lg px-4 pt-4 z-20 mx-auto flex justify-end">
        <Dialog.Panel className={fonts.nunito.className}>
          <div
            className={cn(
              'bg-white shadow-sm rounded-full p-2 flex items-center space-x-2 border transition-all',
              isValueValid(v) ? 'border-neutral-100' : 'border-red-500 ring-1 ring-red-500',
            )}
          >
            <button
              className="text-2xl flex-shrink-0 font-extrabold rounded-full text-cyan-500 h-9 w-9 pb-[2px] bg-cyan-100 disabled:bg-neutral-100 disabled:text-neutral-300"
              onClick={() => setValue(v - 100)}
              data-testid="current-goal-modal-decrease"
              disabled={v <= 100}
            >
              -
            </button>
            <input
              type="number"
              value={v}
              onChange={(e) => setValue(parseInt(e.target.value.slice(isDirty ? 0 : goal.toString().length)))}
              className="text-2xl font-extrabold text-neutral-700 flex-1 w-18 text-center outline-none bg-transparent"
              min={100}
              max={constants.MAX_VALUE}
              step={100}
              data-testid="current-goal-modal-input"
              autoFocus
              required
            />
            <button
              className="text-2xl flex-shrink-0 font-extrabold rounded-full text-cyan-500 h-9 w-9 pb-[2px] bg-cyan-100 disabled:bg-neutral-100 disabled:text-neutral-300"
              onClick={() => setValue(v + 100)}
              data-testid="current-goal-modal-increase"
              disabled={v >= constants.MAX_VALUE}
            >
              +
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CurrentGoalModal;
