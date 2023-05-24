import { useEffect } from 'react';

import { goalStore, recordsStore } from 'lib/stores';

/* c8 ignore start */
export const useLoadStore = () => {
  useEffect(() => {
    if (!localStorage.getItem('current-goal')) localStorage.setItem('current-goal', '2500');
    goalStore.getState().fetch();
    recordsStore.getState().fetch();
  }, []);
};
/* c8 ignore stop */

export * from 'lib/stores/modal';
export * from 'lib/stores/date';
export * from 'lib/stores/goal';
export * from 'lib/stores/records';
