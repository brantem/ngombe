import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useHistoriesStore } from 'lib/stores';

const timestamp = '1672506000000';

describe('useHistoriesStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useHistoriesStore());
    act(() => result.current.reset());
  });

  it('should upsert a history', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    expect(result.current.histories).toMatchObject({});
    act(() => result.current.drink(timestamp, 0));
    act(() => result.current.drink(timestamp, -1));
    expect(result.current.histories).toMatchObject({});
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.histories).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.histories).toMatchObject({ [timestamp]: 200 });
    act(() => result.current.drink(timestamp, -200));
    expect(result.current.histories).toMatchObject({});
  });

  it('should calc total value', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    act(() => result.current.drink(timestamp, 100));
    act(() => result.current.drink(timestamp + 1, 100));
    expect(result.current.calcTotalValue()).toEqual(200);
  });

  it('should update a history', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    act(() => result.current.update(timestamp, 100));
    expect(result.current.histories).toMatchObject({});
    act(() => result.current.drink(timestamp, 100));
    act(() => result.current.update(timestamp, 0));
    expect(result.current.histories).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.update(timestamp, 200));
    expect(result.current.histories).toMatchObject({ [timestamp]: 200 });
    act(() => result.current.update(timestamp, -100));
    expect(result.current.histories).toMatchObject({ [timestamp]: 100 });
  });

  it('should remove a history', async () => {
    const { result } = renderHook(() => useHistoriesStore());
    act(() => result.current.drink(timestamp, 100));
    act(() => result.current.remove(timestamp + 1));
    expect(result.current.histories).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.remove(timestamp));
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
