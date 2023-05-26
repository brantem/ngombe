import { renderHook, act } from '@testing-library/react';

import { useModal } from 'lib/hooks';

describe('useAppStore', () => {
  it('should run correctly', () => {
    const { result } = renderHook(() => useModal('modal-1'));
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.data).toBeUndefined();
    act(() => result.current.show());
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.data).toBeUndefined();
    act(() => result.current.hide());
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should run correctly with data', () => {
    const { result } = renderHook(() => useModal('modal-1'));
    expect(result.current.isOpen).toEqual(false);
    act(() => result.current.show({ a: 1 }));
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.data).toMatchObject({ a: 1 });
    act(() => result.current.hide());
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.data).toBeUndefined();
  });
});
