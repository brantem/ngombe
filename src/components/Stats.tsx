import { useGoalStore, useRecordsStore } from 'lib/stores';
import { calcPercentage, cn } from 'lib/helpers';

type StatsProps = React.ComponentPropsWithoutRef<'div'> & {
  isBackground?: boolean;
};

const Stats = ({ className, isBackground, ...props }: StatsProps) => {
  const goal = useGoalStore((state) => state.value);
  const value = useRecordsStore((state) => state.calcTotalValue());
  const percentage = calcPercentage(value, goal);

  return (
    <div className={cn('text-center flex flex-col justify-center items-center', className)} {...props}>
      <h1
        className={cn(
          'tabular-nums text-7xl font-extrabold',
          /* c8 ignore next */ isBackground ? 'text-neutral-200' : 'text-cyan-600',
        )}
        data-testid="stats-value"
      >
        {value}ml
      </h1>
      <p
        className={cn(
          'tabular-nums text-2xl',
          /* c8 ignore next */ isBackground ? 'text-neutral-300' : 'text-cyan-500',
        )}
        data-testid="stats-percentage"
      >
        {percentage}% of your goal
      </p>
    </div>
  );
};

export default Stats;
