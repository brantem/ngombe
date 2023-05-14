import { useEffect } from 'react';

import * as fonts from 'lib/fonts';
import { useHistoriesStore } from 'lib/stores';

export default function Home() {
  const { value, percentage, drink, reset } = useHistoriesStore((state) => {
    const value = state.calcTotalValue();

    return {
      value,
      percentage: Math.round((value / state.target) * 100),
      drink: (s = 1) => {
        const v = Math.round(3350 / 60);
        state.drink(state.calcTotalValue() + v !== v * s ? v * s : v);
      },
      reset: state.reset,
    };
  });

  useEffect(() => {
    const id = setInterval(() => {
      const s = new Date().getSeconds();
      if (s === 0) return reset();
      drink(s);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <main className={`h-full relative ${fonts.nunito.className}`}>
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
          <div className="bg-teal-500" />
        </div>

        <div className="fixed inset-0 flex items-center justify-center z-[60] h-full w-full">
          <div
            className="absolute top-0 right-0 left-0 bg-white h-full wave transition-all duration-1000 ease-linear"
            style={{
              animationPlayState: percentage >= 100 ? 'stopped' : 'running',
              maxHeight: 100 - Math.min(percentage, 100) + '%',
            }}
          >
            <div className="w-full text-center flex items-center justify-center flex-col h-full fixed inset-0">
              <h1 className="tabular-nums text-7xl font-extrabold text-neutral-200">{value}ml</h1>
              <p className="tabular-nums text-2xl text-neutral-300">{percentage}% of your goal</p>
            </div>
          </div>

          <div className="text-center">
            <h1 className="tabular-nums text-7xl font-extrabold text-teal-600">{value}ml</h1>
            <p className="tabular-nums text-2xl text-teal-500">{percentage}% of your goal</p>
          </div>
        </div>
      </main>
    </>
  );
}
