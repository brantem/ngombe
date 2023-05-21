import { useEffect } from 'react';
import dayjs from 'dayjs';

import storage from 'lib/storage';
import { recordsStore } from 'lib/stores';
import type { Schema } from 'types/storage';

/* c8 ignore start */
export const useLoadStore = () => {
  useEffect(() => {
    (async () => {
      const date = dayjs();
      const query = IDBKeyRange.bound(date.startOf('day').valueOf(), date.endOf('day').valueOf());
      const records = ((await storage.getAll('records', query)) as Schema['records']['value'][]).reduce(
        (records, record) => ({ ...records, [record.timestamp]: record.value }),
        {} as Record<number, number>,
      );
      recordsStore.setState({ records });
    })();
  }, []);
};
/* c8 ignore stop */

export * from 'lib/stores/modal';
export * from 'lib/stores/goal';
export * from 'lib/stores/records';
