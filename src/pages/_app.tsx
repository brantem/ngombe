import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useTargetStore, useHistoriesStore } from 'lib/stores';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const target = useTargetStore((state) => state.target);
  const hasReachedTarget = useHistoriesStore((state) => state.calcTotalValue() >= target);

  return (
    <>
      <Head>
        <meta name="theme-color" content={hasReachedTarget ? '#cffafe' : '#ffffff'} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
