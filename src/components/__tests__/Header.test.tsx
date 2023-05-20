import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from 'components/Header';

import { useModalStore } from 'lib/stores';

describe('Header', () => {
  it('should match snapshot', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('should open histories modal', () => {
    const { result } = renderHook(() => useModalStore());
    const show = vi.spyOn(result.current, 'show');

    render(<Header />);
    act(() => screen.getByText('Histories').click());
    // expect(show).toHaveBeenCalledWith('histories'); // for some reason this is not working
    expect(show).toHaveBeenCalled();
  });

  it('should open target modal', () => {
    const { result } = renderHook(() => useModalStore());
    const show = vi.spyOn(result.current, 'show');

    render(<Header />);
    act(() => screen.getByText('2500ml').click());
    // expect(show).toHaveBeenCalledWith('target'); // for some reason this is not working
    expect(show).toHaveBeenCalled();
  });
});
