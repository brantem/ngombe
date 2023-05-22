import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useGoalStore } from 'lib/stores';

describe('useGoalStore', () => {
  it('should set goal', async () => {
    const { result } = renderHook(() => useGoalStore());
    expect(result.current.value).toEqual(2500);
    act(() => result.current.set(3000));
    expect(result.current.value).toEqual(3000);
  });
});
