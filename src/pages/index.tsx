import Waves from 'components/Waves';
import Background from 'components/Background';
import Header from 'components/Header';
import Stats from 'components/Stats';
import Footer from 'components/Footer';
import DrinkModal from 'components/modals/DrinkModal';
import RecordsModal from 'components/modals/RecordsModal';
import CurrentGoalModal from 'components/modals/CurrentGoalModal';
import GoalModal from 'components/modals/GoalModal';

import * as fonts from 'lib/fonts';

export default function Home() {
  return (
    <>
      <main className={`h-full relative ${fonts.nunito.className}`}>
        <Waves />

        <div className="fixed inset-0 z-[60] h-full w-full">
          <Background>
            <Header isBackground />

            <Stats isBackground />

            <Footer isBackground />
          </Background>

          <div className="grid grid-rows-3 h-full">
            <Header />

            <Stats />

            <Footer />
          </div>
        </div>
      </main>

      <DrinkModal />
      <RecordsModal />
      <CurrentGoalModal />
      <GoalModal />
    </>
  );
}
