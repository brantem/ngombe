import { useCurrentHeight } from 'lib/hooks';
import { useGoalStore, useRecordsStore } from 'lib/stores';
import { cn } from 'lib/helpers';

type BackgroundProps = React.ComponentPropsWithoutRef<'div'>;

const Background = ({ className, children, ...props }: BackgroundProps) => {
  const height = useCurrentHeight();
  const currentGoal = useGoalStore((state) => state.value);
  const percentage = useRecordsStore((state) => {
    const goal = 'goal' in state.records ? state.records.goal : currentGoal;
    return goal > 0 ? state.calcPercentage(goal) : state.date ? (state.calcTotalValue() > 0 ? 100 : 0) : 0;
  });

  return (
    <div
      className={cn(
        'absolute top-0 right-0 left-0 bg-white h-full wave transition-[max-height] ease-linear duration-1000',
        className,
      )}
      {...props}
      style={{
        animationPlayState: percentage >= 100 ? 'stopped' : 'running',
        maxHeight: 100 - Math.min(percentage, 100) + '%',
      }}
    >
      <div
        className="fixed inset-0 grid grid-rows-3 h-screen w-screen"
        style={{ height: height > 0 ? `calc(${height * 0.01 + 'px'} * 100)` : '100vh' } /* safari moment */}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
