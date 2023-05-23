// https://github.com/testing-library/jest-dom/issues/439#issuecomment-1536524120

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import storage from 'lib/storage';

declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

beforeEach(() => {
  vi.stubGlobal('IDBKeyRange', { bound: () => {} });
  vi.spyOn(storage, '_getDB').mockReturnValue(Promise.resolve() as any);
  vi.spyOn(storage, 'get').mockReturnValue(Promise.resolve(undefined));
  vi.spyOn(storage, 'getAll').mockReturnValue(Promise.resolve([]));
  vi.spyOn(storage, 'put').mockReturnValue(Promise.resolve(0));
  vi.spyOn(storage, 'add').mockReturnValue(Promise.resolve(0));
  vi.spyOn(storage, 'delete').mockReturnValue(Promise.resolve());
});
