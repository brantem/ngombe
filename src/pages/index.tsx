import { useState, useEffect } from 'react';
import { Nunito } from 'next/font/google';

import { useCurrentHeight } from 'lib/hooks';

const nunito = Nunito({ subsets: ['latin'], weight: ['500', '800'] });

export default function Home() {
  const height = useCurrentHeight();

  const [value, setValue] = useState(3350);
  const [percentage, setPercentage] = useState(50);

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
      <main className={`h-full flex items-center justify-center relative ${nunito.className}`}>
        <div
          className="absolute top-0 right-0 left-0 bg-white transition-all h-full max-h-[var(--height)] overflow-hidden wave"
          style={
            {
              '--animation-play-state': percentage >= 100 ? 'stopped' : 'running',
              '--height': 100 - Math.min(percentage, 100) + '%',
            } as React.CSSProperties
          }
        >
          <div
            className="h-screen w-full text-center flex items-center justify-center flex-col"
            style={
              {
                '--vh': height * 0.01 + 'px',
                height: height > 0 ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
              } as React.CSSProperties
            }
          >
            <h1 className="text-7xl font-extrabold text-neutral-200">{value}ml</h1>
            <p className="text-2xl mt-2 text-neutral-300">{percentage}%</p>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-7xl font-extrabold text-teal-600">{value}ml</h1>
          <p className="text-2xl text-teal-500">{percentage}% of your goal</p>
        </div>
      </main>

      <div className="fixed w-full bottom-[4vh] left-0 flex justify-center">
        <button className="rounded-full h-16 w-16 bg-teal-700 text-teal-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </button>
      </div>
    </>
  );
}
