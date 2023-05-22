import { openDB, IDBPDatabase, StoreNames, StoreValue, StoreKey } from 'idb';

import { Schema } from 'types/storage';

/* c8 ignore start */
class Storage {
  db: IDBPDatabase<Schema> | undefined;

  _getDB() {
    return openDB('ngombe', 1, {
      async upgrade(db) {
        db.createObjectStore('goals', { keyPath: 'timestamp' });

        db.createObjectStore('records', { keyPath: 'timestamp' });
      },
    });
  }

  async get<Name extends StoreNames<Schema>>(name: Name, key: StoreKey<Schema, Name>) {
    const db = await this._getDB();
    return db.get(name, key);
  }

  async getAll<Name extends StoreNames<Schema>>(name: Name, query: IDBKeyRange) {
    const db = await this._getDB();
    return db.getAll(name, query);
  }

  async put<Name extends StoreNames<Schema>>(name: Name, value: StoreValue<Schema, Name>) {
    const db = await this._getDB();
    return db.put(name, value);
  }

  async add<Name extends StoreNames<Schema>>(name: Name, value: StoreValue<Schema, Name>) {
    const db = await this._getDB();
    return db.add(name, value);
  }

  async delete<Name extends StoreNames<Schema>>(name: Name, key: StoreKey<Schema, Name>) {
    const db = await this._getDB();
    return db.delete(name, key);
  }
}

const storage = new Storage();
export default storage;
/* c8 ignore stop */
