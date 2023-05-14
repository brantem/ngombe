import { cn } from 'lib/helpers';
import { useHistoriesStore } from 'lib/stores';

type BackgroundProps = React.ComponentPropsWithoutRef<'div'>;

const Background = ({ className, ...props }: BackgroundProps) => {
  const percentage = useHistoriesStore((state) => Math.round((state.calcTotalValue() / state.target) * 100));

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
    />
  );
};

export default Background;
