import { renderHook, act } from '@testing-library/react';

import { useAppStore, useGoalStore, useRecordsStore } from 'lib/stores';

describe('useAppStore', () => {
  afterEach(() => {
    act(() => useAppStore.setState({ items: {}, date: undefined }));
  });

  it('should set and remove item', async () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.items).not.toHaveProperty('item-1');
    act(() => result.current.setItem('item-1', 1));
    expect(result.current.items['item-1']).toEqual(1);
    act(() => result.current.deleteItem('item-1'));
    expect(result.current.items).not.toHaveProperty('item-1');
  });

  it('should show item with data', async () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.items).not.toHaveProperty('item-1');
    act(() => result.current.setItem('item-1', { a: 1 }));
    expect(result.current.items['item-1']).toEqual({ a: 1 });
  });

  it('should set date', () => {
    const goal = renderHook(() => useGoalStore());
    const fetchGoal = vi.spyOn(goal.result.current, 'fetch').mockImplementationOnce(() => {});

    const records = renderHook(() => useRecordsStore());
    const fetchRecords = vi.spyOn(records.result.current, 'fetch').mockImplementationOnce(() => {});

    const { result } = renderHook(() => useAppStore());
    expect(result.current.date).toBeUndefined();
    act(() => result.current.setDate('2023-01-01'));
    expect(result.current.date).toBe('2023-01-01');
    expect(fetchGoal).toHaveBeenCalledWith('2023-01-01');
    expect(fetchRecords).toHaveBeenCalledWith('2023-01-01');
  });
});
