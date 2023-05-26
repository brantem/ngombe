import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from 'components/Footer';

import { useAppStore } from 'lib/stores';

describe('Footer', () => {
  it('should match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('should open drink modal', () => {
    const { result } = renderHook(() => useAppStore());
    const setItem = vi.spyOn(result.current, 'setItem');

    render(<Footer />);
    act(() => screen.getByText('Drink').click());
    expect(setItem).toHaveBeenCalledWith('drink', { hideTime: true });
  });
});
