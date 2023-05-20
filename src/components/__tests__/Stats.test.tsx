import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Stats from 'components/Stats';

import { goalStore, useRecordsStore } from 'lib/stores';

describe('Stats', () => {
  it('should not show NaN when not ready', () => {
    render(<Stats />);
    expect(screen.getByTestId('stats-value').textContent).toEqual('0ml');
    expect(screen.getByTestId('stats-percentage').textContent).toEqual('0% of your goal');
  });

  it('should show correct stats', () => {
    act(() => goalStore.setState({ goal: 2500, isReady: true }));
    const records = renderHook(() => useRecordsStore());

    const { container } = render(<Stats />);
    act(() => records.result.current.drink(Date.now().toString(), 100));
    expect(screen.getByTestId('stats-value').textContent).toEqual('100ml');
    expect(screen.getByTestId('stats-percentage').textContent).toEqual('4% of your goal');
    expect(container).toMatchSnapshot();
  });
});
