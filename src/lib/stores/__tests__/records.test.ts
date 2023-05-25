import dayjs from 'dayjs';
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
    vi.restoreAllMocks();
  });

  it('should fetch records', async () => {
    const { result } = renderHook(() => useRecordsStore());
    expect(result.current.records).toEqual({});

    vi.spyOn(storage, 'getAll').mockImplementationOnce(() => Promise.resolve([{ timestamp, value: 1 }]));
    await act(() => result.current.fetch('2023-01-01'));
    expect(result.current.records).toEqual({ [timestamp]: 1 });

    vi.spyOn(storage, 'getAll').mockImplementationOnce(() => Promise.resolve([]));
    await act(() => result.current.fetch('2023-01-02'));
    expect(result.current.records).toEqual({});

    vi.spyOn(storage, 'getAll').mockImplementationOnce(() => Promise.resolve([]));
    await act(() => result.current.fetch());
    expect(result.current.records).toEqual({});
  });

  it('should upsert a record', async () => {
    const goal = { timestamp: dayjs(timestamp).startOf('day').valueOf(), value: 2500 };
    const record = (value: number) => ({ timestamp, value });

    const put = vi.fn(() => Promise.resolve(timestamp));
    vi.spyOn(storage, 'put').mockImplementation(put);
    vi.spyOn(storage, 'delete').mockReturnValue(Promise.resolve());

    const { result } = renderHook(() => useRecordsStore());
    act(() => result.current.drink(timestamp, 0));
    expect(put).not.toHaveBeenCalled();
    expect(result.current.records).toMatchObject({});

    act(() => result.current.drink(timestamp, -1));
    expect(put).not.toHaveBeenCalled();
    expect(result.current.records).toMatchObject({});

    act(() => result.current.drink(timestamp, 100));
    expect(put).toHaveBeenCalledWith('records', record(100));
    expect(put).toHaveBeenCalledWith('goals', goal);
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    put.mockClear();

    act(() => result.current.drink(timestamp, 100));
    expect(put).toHaveBeenCalledWith('records', record(200));
    expect(put).not.toHaveBeenCalledWith('goals', goal);
    expect(result.current.records).toMatchObject({ [timestamp]: 200 });
    put.mockClear();

    act(() => result.current.drink(timestamp, -100));
    expect(put).toHaveBeenCalledWith('records', record(100));
    expect(put).not.toHaveBeenCalledWith('goals', goal);
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    put.mockClear();

    act(() => result.current.drink(timestamp, -100));
    expect(storage.delete).toHaveBeenCalledWith('records', timestamp);
    expect(put).not.toHaveBeenCalledWith('goals', goal);
    expect(result.current.records).toMatchObject({});
  });

  it('should calc total value', async () => {
    act(() => recordsStore.setState({ records: { [timestamp]: 100, [timestamp + 1]: 100 } }));

    const { result } = renderHook(() => useRecordsStore());
    expect(result.current.calcTotalValue()).toEqual(200);
  });

  it('should update a record', async () => {
    const put = vi.fn(() => Promise.resolve(timestamp));
    vi.spyOn(storage, 'put').mockImplementation(put);

    const { result } = renderHook(() => useRecordsStore());
    act(() => result.current.update(timestamp, 100));
    expect(put).not.toHaveBeenCalledWith('records', timestamp);
    expect(result.current.records).toMatchObject({});

    act(() => recordsStore.setState({ records: { [timestamp]: 100 } }));
    act(() => result.current.update(timestamp, 0));
    expect(put).not.toHaveBeenCalledWith('records', { timestamp, value: 0 });
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
    put.mockClear();

    act(() => result.current.update(timestamp, 200));
    expect(put).toHaveBeenCalledWith('records', { timestamp, value: 200 });
    expect(result.current.records).toMatchObject({ [timestamp]: 200 });
    put.mockClear();

    act(() => result.current.update(timestamp, -100));
    expect(put).toHaveBeenCalledWith('records', { timestamp, value: 100 });
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });
  });

  it('should remove a record', async () => {
    act(() => recordsStore.setState({ records: { [timestamp]: 100 } }));

    vi.spyOn(storage, 'delete').mockReturnValue(Promise.resolve());

    const { result } = renderHook(() => useRecordsStore());
    act(() => result.current.remove(timestamp + 1));
    expect(storage.delete).not.toHaveBeenCalledWith('records', timestamp + 1);
    expect(result.current.records).toMatchObject({ [timestamp]: 100 });

    act(() => result.current.remove(timestamp));
    expect(storage.delete).toHaveBeenCalledWith('records', timestamp);
    expect(result.current.records).toMatchObject({});
  });
});
