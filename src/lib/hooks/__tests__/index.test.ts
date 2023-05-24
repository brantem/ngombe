import { act, renderHook } from '@testing-library/react';

import { useDebounce } from 'lib/hooks';

test('useDebounce', async () => {
  vi.useFakeTimers();

  const { result, rerender } = renderHook((v) => useDebounce(v, 100), { initialProps: 100 });
  expect(result.current).toEqual(100);
  rerender(200);
  expect(result.current).toEqual(100);
  act(() => vi.advanceTimersToNextTimer());
  expect(result.current).toEqual(200);

  vi.useRealTimers();
});
