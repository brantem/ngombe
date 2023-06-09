import { useGoalStore, useRecordsStore } from 'lib/stores';
import { calcPercentage } from 'lib/helpers';

const Waves = () => {
  const goal = useGoalStore((state) => state.value);
  const percentage = useRecordsStore((state) => calcPercentage(state.calcTotalValue(), goal));

  return (
    <div className="grid grid-rows-5 w-full h-full fixed inset-0">
      <div
        className="bg-cyan-100 wave h-[115%] z-40"
        style={{
          animationDuration: '1.75s',
          animationPlayState: percentage < 80 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-cyan-200 wave h-[115%] z-30"
        style={{
          animationDuration: '2s',
          animationPlayState: percentage < 60 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-cyan-300 wave h-[115%] z-20"
        style={{
          animationDuration: '2.25s',
          animationPlayState: percentage < 40 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-cyan-400 wave h-[115%] z-10"
        style={{
          animationDuration: '2.5s',
          animationPlayState: percentage < 20 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-cyan-500"
        style={{
          animationDuration: '2.75s',
        }}
      />
    </div>
  );
};

export default Waves;
