import { useEffect, useState } from 'react';

import Waves from 'components/Waves';
import Background from 'components/Background';
import Header from 'components/Header';
import Stats from 'components/Stats';
import Footer from 'components/Footer';
import TargetModal from 'components/modals/TargetModal';

import * as fonts from 'lib/fonts';
import { useHistoriesStore } from 'lib/stores';

export default function Home() {
  const { drink, reset } = useHistoriesStore((state) => {
    return {
      drink: (s = 1) => {
        const v = Math.round(3350 / 60);
        state.drink(state.calcTotalValue() + v !== v * s ? v * s : v);
      },
      reset: state.reset,
    };
  });

  const [isOpen, setIsOpen] = useState(false);

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
        <Waves />

        <div className="fixed inset-0 z-[60] h-full w-full">
          <Background>
            <div className="fixed inset-0 grid grid-rows-3">
              <Header isBackground onTargetClick={() => setIsOpen((prev) => !prev)} />

              <Stats isBackground />

              <Footer isBackground />
            </div>
          </Background>

          <div className="grid grid-rows-3 h-full">
            <Header onTargetClick={() => setIsOpen((prev) => !prev)} />

            <Stats />

            <Footer />
          </div>
        </div>
      </main>

      <TargetModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
