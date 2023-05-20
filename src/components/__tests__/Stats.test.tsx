import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Stats from 'components/Stats';

import { useHistoriesStore } from 'lib/stores';

test('Stats', () => {
  const { result } = renderHook(() => useHistoriesStore());
  act(() => result.current.drink(Date.now().toString(), 100));

  const { container } = render(<Stats />);
  expect(container).toMatchSnapshot();
});
