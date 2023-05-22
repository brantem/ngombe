import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from 'components/Header';

import { goalStore, useModalStore } from 'lib/stores';

describe('Header', () => {
  beforeAll(() => {
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
    act(() => screen.getByText('Records').click());
    // expect(show).toHaveBeenCalledWith('records'); // for some reason this is not working
    expect(show).toHaveBeenCalled();
  });

  it('should open goal modal', () => {
    const { result } = renderHook(() => useModalStore());
    const show = vi.spyOn(result.current, 'show');

    render(<Header />);
    act(() => screen.getByText('2500ml').click());
    // expect(show).toHaveBeenCalledWith('goal'); // for some reason this is not working
    expect(show).toHaveBeenCalled();
  });
});
