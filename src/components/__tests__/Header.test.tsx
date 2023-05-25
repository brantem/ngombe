import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from 'components/Header';

import { useModalStore, goalStore } from 'lib/stores';

describe('Header', () => {
  beforeEach(() => {
    act(() => goalStore.setState({ value: 2500 }));
  });

  it('should match snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('should open records modal', () => {
    const { result } = renderHook(() => useModalStore());
    const show = vi.spyOn(result.current, 'show');

    render(<Header />);
    act(() => screen.getByTestId('header-records').click());
    expect(show).toHaveBeenCalledWith('records', undefined);
  });

  it('should hide goal button if goal === 0', () => {
    act(() => goalStore.setState({ value: 0 }));

    render(<Header />);
    expect(screen.queryByTestId('header-goal')).not.toBeInTheDocument();
  });

  it('should open goal modal', async () => {
    const { result } = renderHook(() => useModalStore());
    const show = vi.spyOn(result.current, 'show').mockImplementationOnce(() => {});

    render(<Header />);
    act(() => screen.getByTestId('header-goal').click());
    expect(show).toHaveBeenCalledWith('current-goal', undefined);
  });
});
