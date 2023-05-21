import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { recordsStore, useRecordsStore } from 'lib/stores';

const timestamp = 1672506000000;

describe('useRecordsStore', () => {
  beforeEach(() => {
    act(() => recordsStore.setState({ records: {} }));
  });

  it('should upsert a record', async () => {
    const { result } = renderHook(() => useRecordsStore());
    expect(result.current.records).toMatchObject({});
    act(() => result.current.drink(timestamp, 0));
    act(() => result.current.drink(timestamp, -1));
    expect(result.current.records).toMatchObject({});
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.drink(timestamp, 100));
    expect(result.current.records).toMatchObject({ [timestamp]: 200 });
    act(() => result.current.drink(timestamp, -200));
    expect(result.current.records).toMatchObject({});
  });

  it('should calc total value', async () => {
    const { result } = renderHook(() => useRecordsStore());
    act(() => result.current.drink(timestamp, 100));
    act(() => result.current.drink(timestamp + 1, 100));
    expect(result.current.calcTotalValue()).toEqual(200);
  });

  it('should update a record', async () => {
    const { result } = renderHook(() => useRecordsStore());
    act(() => result.current.update(timestamp, 100));
    expect(result.current.records).toMatchObject({});
    act(() => result.current.drink(timestamp, 100));
    act(() => result.current.update(timestamp, 0));
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.update(timestamp, 200));
    expect(result.current.records).toMatchObject({ [timestamp]: 200 });
    act(() => result.current.update(timestamp, -100));
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
  });

  it('should remove a record', async () => {
    const { result } = renderHook(() => useRecordsStore());
    act(() => result.current.drink(timestamp, 100));
    act(() => result.current.remove(timestamp + 1));
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.remove(timestamp));
    expect(result.current.records).toMatchObject({});
  });
});
