import { cn } from 'lib/helpers';
import { useModal } from 'lib/hooks';
import { useDateStore, useGoalStore } from 'lib/stores';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  onClick?: () => void;
  isBackground?: boolean;
};

const Button = ({ isBackground, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'h-9 px-3 rounded-full border shadow-sm',
        /* c8 ignore next 3 */
        isBackground
          ? 'bg-neutral-100 border-neutral-200 text-neutral-500'
          : 'bg-white border-neutral-100 text-cyan-500',
      )}
      {...props}
    />
  );
};

type RecordsButtonProps = {
  isBackground?: boolean;
};

const RecordsButton = ({ isBackground }: RecordsButtonProps) => {
  const modal = useModal('records');

  return (
    <Button isBackground={isBackground} onClick={() => modal.show()} data-testid="header-records">
      Records
    </Button>
  );
};

type GoalButtonProps = {
  isBackground?: boolean;
};

const GoalButton = ({ isBackground }: GoalButtonProps) => {
  const modal = useModal('current-goal');
  const date = useDateStore((state) => state.value);
  const goal = useGoalStore((state) => state.value);

  if (modal.isOpen || (date && goal === 0)) return null;

  return (
    <Button isBackground={isBackground} onClick={() => modal.show()} data-testid="header-goal">
      {/* c8 ignore next */ goal > 0 ? `${goal}ml` : <>&nbsp;</>}
    </Button>
  );
};

type HeaderProps = {
  isBackground?: boolean;
};

const Header = ({ isBackground }: HeaderProps) => {
  return (
    <header className="w-full px-4 pt-4">
      <div className="max-w-lg w-full mx-auto flex justify-between font-bold">
        <RecordsButton isBackground={isBackground} />

        <GoalButton isBackground={isBackground} />
      </div>
    </header>
  );
};

export default Header;
