import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useHistoriesStore } from 'lib/stores';

const timestamp = 1672506000000;

describe('useHistoriesStore', () => {
  it('should upsert a history', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    expect(result.current.histories).toMatchObject({});
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.histories).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.histories).toMatchObject({ [timestamp]: 200 });
  });

  it('should calc total value', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    expect(result.current.calcTotalValue()).toEqual(200);
  });

  it('should remove a history', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    expect(result.current.histories).toMatchObject({ [timestamp]: 200 });
    act(() => result.current.remove(timestamp.toString()));
    expect(result.current.histories).toMatchObject({});
  });

  it('should remove all histories', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.histories).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.reset());
    expect(result.current.histories).toMatchObject({});
  });
});
