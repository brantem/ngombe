import { renderHook, act } from '@testing-library/react';

import { useDateStore, useGoalStore, useRecordsStore } from 'lib/stores';

test('useDateStore', () => {
  const goal = renderHook(() => useGoalStore());
  const fetchGoal = vi.spyOn(goal.result.current, 'fetch').mockImplementationOnce(() => {});

  const records = renderHook(() => useRecordsStore());
  const fetchRecords = vi.spyOn(records.result.current, 'fetch').mockImplementationOnce(() => {});

  const { result } = renderHook(() => useDateStore());
  expect(result.current.value).toBeUndefined();
  act(() => result.current.set('2023-01-01'));
  expect(result.current.value).toBe('2023-01-01');
  expect(fetchGoal).toHaveBeenCalledWith('2023-01-01');
  expect(fetchRecords).toHaveBeenCalledWith('2023-01-01');
});
