import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useModalStore } from 'lib/stores';

describe('useModalStore', () => {
  it('should show modal', async () => {
    const { result } = renderHook(() => useModalStore());
    expect(result.current.items.has('modal-1')).toEqual(false);
    act(() => result.current.show('modal-1'));
    expect(result.current.items.get('modal-1')).toEqual(true);
  });

  it('should show modal with data', async () => {
    const { result } = renderHook(() => useModalStore());
    expect(result.current.items.has('modal-2')).toEqual(false);
    act(() => result.current.show('modal-2', { a: 1 }));
    expect(result.current.items.get('modal-2')).toEqual({ a: 1 });
  });

  it('should hide modal', async () => {
    const { result } = renderHook(() => useModalStore());
    expect(result.current.items.has('modal-1')).toEqual(true);
    act(() => result.current.hide('modal-1'));
    expect(result.current.items.has('modal-1')).toEqual(false);
  });
});
