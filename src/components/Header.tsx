import { cn } from 'lib/helpers';
import { useHistoriesStore } from 'lib/stores';

type TargetProps = React.ComponentPropsWithoutRef<'button'> & {
  isBackground?: boolean;
};

const Target = ({ isBackground, ...props }: TargetProps) => {
  const target = useHistoriesStore((state) => state.target);

  return (
    <button
      className={cn(
        'px-3 py-1 rounded-full border-2 outline-none',
        isBackground ? 'border-neutral-500 text-neutral-500' : 'border-teal-500 text-teal-500'
      )}
      {...props}
    >
      {target}ml
    </button>
  );
};

type HeaderProps = {
  isBackground?: boolean;
  onTargetClick: () => void;
};

const Header = ({ isBackground, onTargetClick }: HeaderProps) => {
  return (
    <header className="w-full px-4 pt-4">
      <div className="max-w-lg w-full mx-auto flex justify-between font-bold">
        <button
          className={cn(
            'px-3 py-1 rounded-full',
            isBackground ? 'bg-neutral-100 text-neutral-500' : 'bg-white text-teal-500'
          )}
        >
          History
        </button>

        <Target isBackground={isBackground} onClick={onTargetClick} />
      </div>
    </header>
  );
};

export default Header;
