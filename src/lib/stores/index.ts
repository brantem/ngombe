import { useEffect } from 'react';

import { goalStore, recordsStore } from 'lib/stores';

/* c8 ignore start */
export const useLoadStore = () => {
  useEffect(() => {
    goalStore.getState().fetch();
    recordsStore.getState().fetch();
  }, []);
};
/* c8 ignore stop */

export * from 'lib/stores/modal';
export * from 'lib/stores/date';
export * from 'lib/stores/goal';
export * from 'lib/stores/records';
