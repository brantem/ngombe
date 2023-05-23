import { useEffect } from 'react';

import { goalStore, recordsStore } from 'lib/stores';

/* c8 ignore start */
export const useLoadStore = () => {
  useEffect(() => {
    let rawGoal = localStorage.getItem('goal');
    let goal = parseInt(rawGoal || '2500');
    if (!rawGoal) localStorage.setItem('goal', goal.toString());
    goalStore.setState({ value: goal });
    recordsStore.getState().setDate(undefined);
  }, []);
};
/* c8 ignore stop */

export * from 'lib/stores/modal';
export * from 'lib/stores/goal';
export * from 'lib/stores/records';
