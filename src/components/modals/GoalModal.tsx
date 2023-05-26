import { useState } from 'react';
import { Dialog } from '@headlessui/react';

import Input from 'components/Input';

import * as fonts from 'lib/fonts';
import { useModal } from 'lib/hooks';
import { useAppStore, useGoalStore } from 'lib/stores';
import * as constants from 'data/constants';

const GoalModal = () => {
  const modal = useModal('goal');
  const date = useAppStore((state) => state.date);
  const { goal, setGoal } = useGoalStore((state) => ({ goal: state.value, setGoal: state.set }));

  const [value, setValue] = useState<number>();
  const isDirty = value !== undefined;
  const v = isDirty ? value : goal;

  const isValueValid = (value: number) => value >= 0 && value <= constants.MAX_VALUE;

  return (
    <Dialog
      open={modal.isOpen}
      /* c8 ignore next 4 */
      onClose={() => {
        modal.hide();
        setValue(undefined);
      }}
      className="fixed inset-0 z-[110] flex items-end"
    >
      <div className="fixed inset-0 bg-black/5" aria-hidden="true" />

      <Dialog.Panel className={`h-full w-full flex items-center justify-center px-4 sm:px-0 ${fonts.nunito.className}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isDirty) setGoal(date, value);
            modal.hide();
            setValue(undefined);
          }}
          className="relative bg-white shadow-sm rounded-xl border border-neutral-100 p-4 space-y-4"
        >
          <Input
            label="Goal"
            type="number"
            className="w-[304px] text-center"
            data-testid="goal-modal-value"
            value={isDirty ? value : goal === 0 ? '' : goal}
            onChange={(e) => {
              if (goal === 0) return setValue(parseInt(e.target.value));
              const _value = e.target.value.slice(isDirty ? 0 : goal.toString().length);
              setValue(parseInt(_value === '0' ? e.target.value : _value));
            }}
            min={0}
            max={constants.MAX_VALUE}
            autoFocus
            required
            invalid={!isValueValid(v)}
          />

          <button type="submit" className="bg-cyan-100 text-cyan-500 h-12 px-5 rounded-xl text-lg w-full font-bold">
            Save
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default GoalModal;
