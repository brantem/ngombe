import { useEffect } from 'react';

import { recordsStore } from 'lib/stores';

/* c8 ignore start */
export const useLoadStore = () => {
  useEffect(() => {
    (async () => {
      recordsStore.getState().setDate(undefined);
    })();
  }, []);
};
/* c8 ignore stop */

export * from 'lib/stores/modal';
export * from 'lib/stores/goal';
export * from 'lib/stores/records';
