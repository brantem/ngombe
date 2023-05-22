import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import storage from 'lib/storage';
import { recordsStore, useRecordsStore } from 'lib/stores';

const timestamp = 1672506000000;

describe('useRecordsStore', () => {
  beforeEach(() => {
    act(() => recordsStore.setState({ records: {} }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set date', async () => {
    const timestamp = Date.now();

    const { result } = renderHook(() => useRecordsStore());
    expect(result.current.records).toEqual({});

    vi.spyOn(storage, 'get').mockImplementationOnce(() => Promise.resolve({ timestamp, value: 2500 }));
    vi.spyOn(storage, 'getAll').mockImplementationOnce(() => Promise.resolve([{ timestamp, value: 1 }]));
    await act(() => result.current.setDate('2023-01-01'));
    expect(result.current.date).toEqual('2023-01-01');
    expect(result.current.records).toEqual({ goal: 2500, [timestamp]: 1 });

    vi.spyOn(storage, 'get').mockImplementationOnce(() => Promise.resolve(undefined));
    vi.spyOn(storage, 'getAll').mockImplementationOnce(() => Promise.resolve([]));
    await act(() => result.current.setDate('2023-01-02'));
    expect(result.current.date).toEqual('2023-01-02');
    expect(result.current.records).toEqual({ goal: 0 });

    vi.spyOn(storage, 'get').mockImplementationOnce(() => Promise.resolve(undefined));
    vi.spyOn(storage, 'getAll').mockImplementationOnce(() => Promise.resolve([]));
    await act(() => result.current.setDate(undefined));
    expect(result.current.date).toEqual(undefined);
    expect(result.current.records).toEqual({});
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
    act(() => result.current.drink(timestamp, -100));
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    act(() => result.current.drink(timestamp, -100));
    expect(result.current.records).toMatchObject({});
  });

  it('should calc total value', async () => {
    act(() => recordsStore.setState({ records: { goal: 2500, [timestamp]: 100, [timestamp + 1]: 100 } }));

    const { result } = renderHook(() => useRecordsStore());
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
