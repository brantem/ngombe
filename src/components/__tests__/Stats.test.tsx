import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Stats from 'components/Stats';

import { goalStore, useHistoriesStore } from 'lib/stores';

describe('Stats', () => {
  it('should not show NaN when not ready', () => {
    render(<Stats />);
    expect(screen.getByTestId('stats-value').textContent).toEqual('0ml');
    expect(screen.getByTestId('stats-percentage').textContent).toEqual('0% of your goal');
  });

  it('should show correct stats', () => {
    act(() => goalStore.setState({ goal: 2500, isReady: true }));
    const histories = renderHook(() => useHistoriesStore());

    const { container } = render(<Stats />);
    act(() => histories.result.current.drink(Date.now().toString(), 100));
    expect(screen.getByTestId('stats-value').textContent).toEqual('100ml');
    expect(screen.getByTestId('stats-percentage').textContent).toEqual('4% of your goal');
    expect(container).toMatchSnapshot();
  });
});
