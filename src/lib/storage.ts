import { openDB, IDBPDatabase, StoreNames, StoreValue, IndexNames, StoreKey } from 'idb';

import { Schema } from 'types/storage';

/* c8 ignore start */
class Storage {
  db: Promise<IDBPDatabase<Schema>>;

  constructor() {
    this.db = openDB('ngombe', 1, {
      async upgrade(db) {
        const records = db.createObjectStore('records', { keyPath: 'timestamp' });
        records.createIndex('timestamp', 'timestamp');
      },
    });
  }

  async getAll<Name extends StoreNames<Schema>>(name: Name, query: IDBKeyRange) {
    const db = await this.db;
    return db.getAll(name, query);
  }

  async put<Name extends StoreNames<Schema>>(name: Name, value: StoreValue<Schema, Name>) {
    const db = await this.db;
    return db.put(name, value);
  }

  async add<Name extends StoreNames<Schema>>(name: Name, value: StoreValue<Schema, Name>) {
    const db = await this.db;
    return db.add(name, value);
  }

  async delete<Name extends StoreNames<Schema>>(name: Name, key: StoreKey<Schema, Name>) {
    const db = await this.db;
    return db.delete(name, key);
  }
}

const dummy = {
  getAll: () => [],
  put: () => {},
  add: () => {},
  delete: () => {},
};

const storage = typeof window !== 'undefined' && 'indexedDB' in window ? new Storage() : dummy;
export default storage;
/* c8 ignore stop */
