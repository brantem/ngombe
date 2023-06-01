import { cn } from 'lib/helpers';
import { useModal } from 'lib/hooks';
import { useGoalStore } from 'lib/stores';

type GoalButtonProps = {
  isBackground?: boolean;
};

const GoalButton = ({ isBackground }: GoalButtonProps) => {
  const modal = useModal('current-goal');
  const goal = useGoalStore((state) => state.value);

  if (modal.isOpen || goal === 0) return null;

  return (
    <button
      className={cn(
        'h-9 px-3 rounded-full border shadow-sm',
        /* c8 ignore next 3 */
        isBackground
          ? 'bg-neutral-100 border-neutral-200 text-neutral-500'
          : 'bg-white border-neutral-100 text-cyan-500',
      )}
      onClick={() => modal.show()}
      data-testid="header-goal"
    >
      {/* c8 ignore next */ goal > 0 ? `${goal}ml` : <>&nbsp;</>}
    </button>
  );
};

type HeaderProps = {
  isBackground?: boolean;
};

const Header = ({ isBackground }: HeaderProps) => {
  return (
    <header className="w-full px-4 pt-4">
      <div className="max-w-lg w-full mx-auto flex justify-end font-bold">
        <GoalButton isBackground={isBackground} />
      </div>
    </header>
  );
};

export default Header;
