import { useEffect } from 'react';

import { useCurrentHeight } from 'lib/hooks';
import { useAppStore, useGoalStore, useRecordsStore } from 'lib/stores';
import { calcPercentage, cn } from 'lib/helpers';
import * as constants from 'data/constants';

type BackgroundProps = React.ComponentPropsWithoutRef<'div'>;

const Background = ({ className, children, ...props }: BackgroundProps) => {
  const height = useCurrentHeight();
  const { date, notSafeToPaint, safeToPaint } = useAppStore((state) => {
    return {
      date: state.date,
      notSafeToPaint: () => state.setItem(constants.NOT_SAFE_TO_PAINT_STATUS_BAR, true),
      safeToPaint: () => state.deleteItem(constants.NOT_SAFE_TO_PAINT_STATUS_BAR),
    };
  });
  const goal = useGoalStore((state) => state.value);
  const percentage = useRecordsStore((state) => {
    const value = state.calcTotalValue();
    if (goal > 0) return calcPercentage(value, goal);
    if (!date) return 0;
    return value > 0 ? 100 : 0;
  });

  useEffect(() => {
    if (percentage < 100) return;
    notSafeToPaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  return (
    <div
      className={cn(
        'absolute top-0 right-0 left-0 bg-white h-full wave transition-[max-height] ease duration-[750ms]',
        className,
      )}
      {...props}
      style={{
        animationPlayState: percentage >= 100 ? 'stopped' : 'running',
        maxHeight: 100 - Math.min(percentage, 100) + '%',
      }}
      onTransitionEnd={safeToPaint}
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
