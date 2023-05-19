import { cn } from 'lib/helpers';
import { useTargetStore, useHistoriesStore } from 'lib/stores';

type HistoryButtonProps = {
  isBackground?: boolean;
};

const HistoryButton = ({ isBackground }: HistoryButtonProps) => {
  const onClick = useHistoriesStore((state) => () => state.setIsModalOpen(true));

  return (
    <button
      className={cn(
        'px-3 py-1 rounded-full',
        isBackground ? 'bg-neutral-100 text-neutral-500' : 'bg-white text-teal-500'
      )}
      onClick={onClick}
    >
      History
    </button>
  );
};

type TargetButtonProps = {
  isBackground?: boolean;
};

const TargetButton = ({ isBackground }: TargetButtonProps) => {
  const { target, onClick } = useTargetStore((state) => ({
    target: state.target,
    onClick: () => state.setIsModalOpen(true),
  }));

  return (
    <button
      className={cn(
        'px-3 py-1 rounded-full border-2 outline-none',
        isBackground ? 'border-neutral-500 text-neutral-500' : 'border-teal-500 text-teal-500'
      )}
      onClick={onClick}
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
        <HistoryButton isBackground={isBackground} />

        <TargetButton isBackground={isBackground} />
      </div>
    </header>
  );
};

export default Header;
