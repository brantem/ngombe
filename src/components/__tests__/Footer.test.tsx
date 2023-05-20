import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from 'components/Footer';

import { useModalStore } from 'lib/stores';

describe('Footer', () => {
  it('should match snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('should open drink modal', () => {
    const { result } = renderHook(() => useModalStore());
    const show = vi.spyOn(result.current, 'show');

    render(<Footer />);
    act(() => screen.getByText('Drink').click());
    expect(show).toHaveBeenCalledWith('drink', { hideTime: true });
  });
});
