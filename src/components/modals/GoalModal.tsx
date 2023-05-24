import { Dialog } from '@headlessui/react';
import { useForm, useFormState } from 'react-hook-form';

import Input from 'components/Input';

import * as fonts from 'lib/fonts';
import { useModal } from 'lib/hooks';
import { useDateStore, useGoalStore } from 'lib/stores';
import { cn } from 'lib/helpers';
import * as constants from 'data/constants';

type Values = {
  value: number;
};

const GoalModal = () => {
  const modal = useModal('goal');
  const date = useDateStore((state) => state.value);
  const { goal, setGoal } = useGoalStore((state) => ({ goal: state.value, setGoal: state.set }));
  const { register, handleSubmit, reset, control } = useForm<Values>({ values: { value: goal } });
  const { errors } = useFormState({ control });

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
          onSubmit={handleSubmit((data) => {
            setGoal(date, data.value);
            modal.hide();
            reset();
          })}
          className="relative bg-white shadow-sm rounded-xl border border-neutral-100 p-4 space-y-4"
        >
          <Input
            label="Goal"
            type="number"
            className={cn('text-center w-[304px]', /* c8 ignore next */ errors.value && 'border-red-500')}
            data-testid="goal-modal-value"
            {...register('value', { required: true, max: constants.MAX_VALUE, valueAsNumber: true })}
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
