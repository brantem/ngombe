import dayjs from 'dayjs';
import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { goalStore, useGoalStore } from 'lib/stores';
import storage from 'lib/storage';

describe('useGoalStore', () => {
  beforeEach(() => {
    act(() => goalStore.setState({ value: 2500 }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch goal', async () => {
    const { result } = renderHook(() => useGoalStore());

    vi.spyOn(storage, 'get').mockReturnValue(Promise.resolve({ timestamp: 0, value: 1000 }));
    await act(() => result.current.fetch('2023-01-01'));
    expect(storage.get).toHaveBeenCalledWith('goals', dayjs('2023-01-01').startOf('day').valueOf());
    expect(result.current.value).toEqual(1000);

    vi.spyOn(storage, 'get').mockReturnValue(Promise.resolve(undefined));
    await act(() => result.current.fetch('2023-01-02'));
    expect(storage.get).toHaveBeenCalledWith('goals', dayjs('2023-01-02').startOf('day').valueOf());
    expect(result.current.value).toEqual(0);

    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue(null) });
    await act(() => result.current.fetch());
    expect(localStorage.getItem).toHaveBeenCalledWith('goal');
    expect(result.current.value).toEqual(2500);

    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue('1000') });
    await act(() => result.current.fetch());
    expect(localStorage.getItem).toHaveBeenCalledWith('goal');
    expect(result.current.value).toEqual(1000);
  });

  it('should set goal', async () => {
    vi.spyOn(storage, 'put').mockReturnValue(Promise.resolve(0));

    const setItem = vi.fn();
    vi.stubGlobal('localStorage', { setItem });

    const { result } = renderHook(() => useGoalStore());
    expect(result.current.value).toEqual(2500);
    act(() => result.current.set(undefined, 3000));
    expect(setItem).toHaveBeenCalledWith('goal', '3000');
    expect(storage.put).toHaveBeenCalledWith('goals', { timestamp: dayjs().startOf('day').valueOf(), value: 3000 });
    expect(result.current.value).toEqual(3000);
  });

  it('should set goal for past date', async () => {
    vi.spyOn(storage, 'put').mockReturnValue(Promise.resolve(0));

    const setItem = vi.fn();
    vi.stubGlobal('localStorage', { setItem });

    const date = '2023-01-02';
    const { result } = renderHook(() => useGoalStore());
    act(() => result.current.set(date, 2000));
    expect(setItem).not.toHaveBeenCalled();
    expect(storage.put).toHaveBeenCalledWith('goals', { timestamp: dayjs(date).startOf('day').valueOf(), value: 2000 });
    expect(result.current.value).toEqual(2000);
  });
});
