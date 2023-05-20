import { useGoalStore, useHistoriesStore } from 'lib/stores';
import { cn } from 'lib/helpers';

type StatsProps = React.ComponentPropsWithoutRef<'div'> & {
  isBackground?: boolean;
};

const Stats = ({ className, isBackground, ...props }: StatsProps) => {
  const goal = useGoalStore((state) => state.goal);
  const { value, percentage } = useHistoriesStore((state) => {
    const value = state.calcTotalValue();

    return { value, percentage: Math.round((value / goal) * 100) };
  });

  return (
    <div className={cn('text-center flex flex-col justify-center items-center', className)} {...props}>
      <h1 className={cn('tabular-nums text-7xl font-extrabold', isBackground ? 'text-neutral-200' : 'text-cyan-600')}>
        {value}ml
      </h1>
      <p className={cn('tabular-nums text-2xl', isBackground ? 'text-neutral-300' : 'text-cyan-500')}>
        {percentage}% of your goal
      </p>
    </div>
  );
};

export default Stats;
