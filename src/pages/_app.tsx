import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useTargetStore, useHistoriesStore } from 'lib/stores';

import 'styles/globals.css';
import { useModal } from 'lib/hooks';

export default function App({ Component, pageProps }: AppProps) {
  const isDrinkModalOpen = useModal('drink').isOpen;
  const target = useTargetStore((state) => state.target);
  const percentage = useHistoriesStore((state) => Math.round((state.calcTotalValue() / target) * 100));

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
