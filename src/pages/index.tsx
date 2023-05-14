import { useState, useEffect } from 'react';

import * as fonts from 'lib/fonts';
import { useCurrentHeight } from 'lib/hooks';

export default function Home() {
  const height = useCurrentHeight();

  const [value, setValue] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const s = new Date().getSeconds();
      setValue(Math.round((3350 / 60) * s));
      setPercentage(Math.round((125 / 60) * s));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <main className={`h-full relative ${fonts.nunito.className}`}>
        <div className="grid grid-rows-5 w-full h-full">
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
            className="absolute top-0 right-0 left-0 bg-white transition-all h-full wave"
            style={{
              animationPlayState: percentage >= 100 ? 'stopped' : 'running',
              maxHeight: 100 - Math.min(percentage, 100) + '%',
            }}
          >
            <div
              className="h-screen w-full text-center flex items-center justify-center flex-col"
              style={{
                height: height > 0 ? `calc(var(${height * 0.01 + 'px'}, 1vh) * 100)` : '100vh', // safari
              }}
            >
              <h1 className="text-7xl font-extrabold text-neutral-200">{value}ml</h1>
              <p className="text-2xl text-neutral-300">{percentage}% of your goal</p>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-7xl font-extrabold text-teal-600">{value}ml</h1>
            <p className="text-2xl text-teal-500">{percentage}% of your goal</p>
          </div>
        </div>
      </main>
    </>
  );
}
