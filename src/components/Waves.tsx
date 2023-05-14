import { useHistoriesStore } from 'lib/stores';

const Waves = () => {
  const percentage = useHistoriesStore((state) => Math.round((state.calcTotalValue() / state.target) * 100));

  return (
    <div className="grid grid-rows-5 w-full h-full fixed inset-0">
      <div
        className="bg-teal-100 wave h-[115%] z-40"
        style={{
          animationDelay: '-0.5s',
          animationPlayState: percentage < 80 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-teal-200 wave h-[115%] z-30"
        style={{
          animationDelay: '-1s',
          animationPlayState: percentage < 60 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-teal-300 wave h-[115%] z-20"
        style={{
          animationDelay: '-1.5s',
          animationPlayState: percentage < 40 ? 'stopped' : 'running',
        }}
      />
      <div
        className="bg-teal-400 wave h-[115%] z-10"
        style={{
          animationDelay: '-2s',
          animationPlayState: percentage < 20 ? 'stopped' : 'running',
        }}
      />
      <div className="bg-teal-500" style={{ animationDelay: '-2.5s' }} />
    </div>
  );
};

export default Waves;
