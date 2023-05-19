import { cn } from 'lib/helpers';
import { useModal } from 'lib/hooks';
import { useTargetStore } from 'lib/stores';

type HistoriesButtonProps = {
  isBackground?: boolean;
};

const HistoriesButton = ({ isBackground }: HistoriesButtonProps) => {
  const modal = useModal('histories');

  return (
    <button
      className={cn(
        'px-3 py-1 rounded-full',
        isBackground ? 'bg-neutral-100 text-neutral-500' : 'bg-white text-teal-500'
      )}
      onClick={modal.onOpen}
    >
      Histories
    </button>
  );
};

type TargetButtonProps = {
  isBackground?: boolean;
};

const TargetButton = ({ isBackground }: TargetButtonProps) => {
  const modal = useModal('target');
  const target = useTargetStore((state) => state.target);

  return (
    <button
      className={cn(
        'px-3 py-1 rounded-full border-2 outline-none',
        isBackground ? 'border-neutral-500 text-neutral-500' : 'border-teal-500 text-teal-500'
      )}
      onClick={modal.onOpen}
    >
      {target}ml
    </button>
  );
};

type HeaderProps = {
  isBackground?: boolean;
};

const Header = ({ isBackground }: HeaderProps) => {
  return (
    <header className="w-full px-4 pt-4">
      <div className="max-w-lg w-full mx-auto flex justify-between font-bold">
        <HistoriesButton isBackground={isBackground} />

        <TargetButton isBackground={isBackground} />
      </div>
    </header>
  );
};

export default Header;
