import { useCurrentHeight } from 'lib/hooks';
import { useTargetStore, useHistoriesStore } from 'lib/stores';
import { cn } from 'lib/helpers';

type BackgroundProps = React.ComponentPropsWithoutRef<'div'>;

const Background = ({ className, children, ...props }: BackgroundProps) => {
  const height = useCurrentHeight();
  const target = useTargetStore((state) => state.target);
  const percentage = useHistoriesStore((state) => Math.round((state.calcTotalValue() / target) * 100));

  return (
    <div
      className={cn(
        'absolute top-0 right-0 left-0 bg-white h-full wave transition-[max-height] ease-linear duration-1000',
        className
      )}
      {...props}
      style={{
        animationPlayState: percentage >= 100 ? 'stopped' : 'running',
        maxHeight: 100 - Math.min(percentage, 100) + '%',
      }}
    >
      <div
        className="fixed inset-0 grid grid-rows-3 h-screen w-screen"
        style={{ height: `calc(${height * 0.01 + 'px'} * 100)` } /* safari moment */}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
