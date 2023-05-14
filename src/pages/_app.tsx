import { useHistoriesStore } from 'lib/stores';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const hasReachedTarget = useHistoriesStore((state) => state.calcTotalValue() >= state.target);

  return (
    <>
      <Head>
        <meta name="theme-color" content={hasReachedTarget ? '#ccfbf1' : '#ffffff'} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
