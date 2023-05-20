import { cn } from 'lib/helpers';
import { useModal } from 'lib/hooks';
import { useGoalStore } from 'lib/stores';

type HistoriesButtonProps = {
  isBackground?: boolean;
};

const HistoriesButton = ({ isBackground }: HistoriesButtonProps) => {
  const modal = useModal('histories');

  return (
    <button
      className={cn(
        'h-9 px-3 rounded-full border shadow-sm',
        /* c8 ignore next 3 */
        isBackground
          ? 'bg-neutral-100 border-neutral-200 text-neutral-500'
          : 'bg-white border-neutral-100 text-cyan-500',
      )}
      onClick={modal.onOpen}
    >
      Histories
    </button>
  );
};

type GoalButtonProps = {
  isBackground?: boolean;
};

const GoalButton = ({ isBackground }: GoalButtonProps) => {
  const modal = useModal('goal');
  const { goal, isReady } = useGoalStore((state) => ({ goal: state.goal, isReady: state.isReady }));

  return (
    <button
      className={cn(
        'h-9 px-3 rounded-full border-2 outline-none shadow-sm min-w-[88px]',
        /* c8 ignore next */ isBackground ? 'border-neutral-500 text-neutral-500' : 'border-cyan-500 text-cyan-500',
      )}
      onClick={modal.onOpen}
    >
      {isReady ? `${goal}ml` : <>&nbsp;</>}
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

        <GoalButton isBackground={isBackground} />
      </div>
    </header>
  );
};

export default Header;
