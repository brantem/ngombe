import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useGoalStore } from 'lib/stores';

describe('useGoalStore', () => {
  it('should set goal', async () => {
    const { result } = renderHook(() => useGoalStore());
    expect(result.current.goal).toEqual(0);
    act(() => result.current.setGoal(3000));
    expect(result.current.goal).toEqual(3000);
  });
});
