import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Stats from 'components/Stats';

import { goalStore, recordsStore } from 'lib/stores';

describe('Stats', () => {
  beforeAll(() => {
    act(() => goalStore.setState({ value: 2500 }));
  });

  it('should not show NaN when not ready', () => {
    render(<Stats />);
    expect(screen.getByTestId('stats-value').textContent).toEqual('0ml');
    expect(screen.getByTestId('stats-percentage').textContent).toEqual('0% of your goal');
  });

  it('should show correct stats', () => {
    act(() => goalStore.setState({ value: 2500 }));
    act(() => recordsStore.setState({ records: { [Date.now()]: 100 } }));

    const { container } = render(<Stats />);
    expect(screen.getByTestId('stats-value').textContent).toEqual('100ml');
    expect(screen.getByTestId('stats-percentage').textContent).toEqual('4% of your goal');
    expect(container).toMatchSnapshot();
  });
});
