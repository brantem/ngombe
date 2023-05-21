import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useLoadStore, useGoalStore, useRecordsStore } from 'lib/stores';
import { useModal } from 'lib/hooks';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useLoadStore();

  const isDrinkModalOpen = useModal('drink').isOpen;
  const goal = useGoalStore((state) => state.goal);
  const percentage = useRecordsStore((state) => Math.round((state.calcTotalValue() / goal) * 100));

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={
            percentage >= 100 ? (isDrinkModalOpen ? '#c6edf1' : '#cffafe') : isDrinkModalOpen ? '#f2f2f2' : '#ffffff'
          }
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
