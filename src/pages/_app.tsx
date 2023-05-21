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
            percentage >= 100 ? (isDrinkModalOpen ? '#c6edf1' : '#cffafe') : isDrinkModalOpen ? '#f2f2f2' : '#ffffff'
          }
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
