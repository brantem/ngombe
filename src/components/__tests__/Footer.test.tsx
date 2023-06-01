import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from 'components/Footer';

import { useAppStore } from 'lib/stores';

describe('Footer', () => {
  it('should match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('should open records modal', () => {
    const { result } = renderHook(() => useAppStore());
    const setItem = vi.spyOn(result.current, 'setItem');

    render(<Footer />);
    act(() => screen.getByTestId('footer-records').click());
    expect(setItem).toHaveBeenCalledWith('records', true);
  });

  it('should open drink modal', () => {
    const { result } = renderHook(() => useAppStore());
    const setItem = vi.spyOn(result.current, 'setItem');

    render(<Footer />);
    act(() => screen.getByTestId('footer-drink').click());
    expect(setItem).toHaveBeenCalledWith('drink', { hideTime: true });
  });
});
