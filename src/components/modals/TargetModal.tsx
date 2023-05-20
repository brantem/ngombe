import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

import { useTargetStore } from 'lib/stores';
import { useDebounce, useModal } from 'lib/hooks';
import * as fonts from 'lib/fonts';

const MAX = 99999;

const TargetModal = () => {
  const modal = useModal('target');
  const { target, setTarget } = useTargetStore((state) => ({
    target: state.target,
    setTarget: state.setTarget,
  }));

  const [value, setValue] = useState<string>();

  const debouncedValue = useDebounce(value, 1000);
  useEffect(() => {
    if (!debouncedValue) return;
    const v = parseInt(debouncedValue);
    if (isNaN(v)) return;
    if (v === target) return;
    setTarget(v);
  }, [debouncedValue]);

  return (
    <Dialog
      open={modal.isOpen}
      onClose={() => {
        setValue(undefined);
        modal.onClose();
      }}
      className="fixed right-0 top-0 left-0 z-[100]"
    >
      <div className="w-full max-full relative">
        <Dialog.Panel className={`absolute top-4 right-4 ${fonts.nunito.className}`}>
          <div className="bg-white shadow-sm rounded-xl p-2 flex items-center space-x-1 border border-neutral-100">
            <button
              className="text-2xl flex-shrink-0 font-extrabold rounded-full text-teal-500 h-9 w-9 pb-[2px] bg-teal-100"
              onClick={() => {
                const v = parseInt(value || target.toString());
                if (isNaN(v) || v === 0) return;
                setValue((v - 10).toString());
              }}
            >
              -
            </button>
            <input
              type="number"
              value={value === undefined ? target : value}
              onChange={(e) => setValue(e.target.value)}
              className="text-2xl font-extrabold text-neutral-700 flex-1 w-20 text-center outline-none"
              max={MAX}
            />
            <button
              className="text-2xl flex-shrink-0 font-extrabold rounded-full text-teal-500 h-9 w-9 pb-[2px] bg-teal-100"
              onClick={() => {
                const v = parseInt(value || target.toString());
                if (isNaN(v) || v >= MAX) return;
                setValue((v + 10).toString());
              }}
            >
              +
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TargetModal;
