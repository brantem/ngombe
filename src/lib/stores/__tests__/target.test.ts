import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useTargetStore } from 'lib/stores';

describe('useTargetStore', () => {
  it('should set target', async () => {
    const { result } = renderHook(() => useTargetStore());
    expect(result.current.target).toEqual(2500);
    act(() => result.current.setTarget(3000));
    expect(result.current.target).toEqual(3000);
  });
});
