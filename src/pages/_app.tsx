import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useLoadStore, useAppStore, useGoalStore, useRecordsStore } from 'lib/stores';
import { calcPercentage } from 'lib/helpers';
import * as constants from 'data/constants';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useLoadStore();
  const { paintDarkerColor, isSafeToPaint } = useAppStore((state) => ({
    paintDarkerColor: ['goal', 'drink'].some((id) => id in state.items),
    isSafeToPaint: !state.items[constants.NOT_SAFE_TO_PAINT_STATUS_BAR],
  }));
  const goal = useGoalStore((state) => state.value);
  const percentage = useRecordsStore((state) => calcPercentage(state.calcTotalValue(), goal));

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
            isSafeToPaint
              ? percentage >= 100
                ? paintDarkerColor
                  ? '#c6edf1'
                  : '#cffafe'
                : paintDarkerColor
                ? '#f2f2f2'
                : '#ffffff'
              : '#ffffff'
          }
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
