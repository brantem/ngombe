import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useLoadStore, useGoalStore, useRecordsStore } from 'lib/stores';
import { useDebounce, useModal } from 'lib/hooks';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useLoadStore();
  const isDrinkModalOpen = useModal('drink').isOpen;
  const goal = useGoalStore((state) => state.goal);
  const percentage = useRecordsStore((state) => Math.round((state.calcTotalValue() / goal) * 100));
  const debouncedPercentage = useDebounce(percentage, 1000);
  // If the percentage >= 100, use the debounced value to seamlessly change the tab color. Essentially, wait until
  // the transition is finished (the waves have reached the top of the page) before changing the tab color. If the
  // current percentage is greater than or equal to 100 and the percentage changes to below 100, the tab color can
  // be simply removed without waiting for the transition.
  const hasReachedGoal = percentage >= 100 ? debouncedPercentage >= 100 : percentage >= 100;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Ngombe" />
        <meta name="keywords" content="Ngombe" />
        <title>Ngombe</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta
          name="theme-color"
          content={
            hasReachedGoal ? (isDrinkModalOpen ? '#c6edf1' : '#cffafe') : isDrinkModalOpen ? '#f2f2f2' : '#ffffff'
          }
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
