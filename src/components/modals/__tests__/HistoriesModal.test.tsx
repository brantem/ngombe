import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HistoriesModal from 'components/modals/HistoriesModal';

import { useModalStore, useHistoriesStore } from 'lib/stores';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

describe('HistoriesModal', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    vi.useFakeTimers();
    vi.setSystemTime(new Date('1 January 2023'));
  });

  beforeEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('histories'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('histories'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should show empty list', () => {
    render(<HistoriesModal />);
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
  });

  it('should open drink modal', () => {
    const modal = renderHook(() => useModalStore());
    const show = vi.spyOn(modal.result.current, 'show');

    render(<HistoriesModal />);
    act(() => screen.getByText('Missed Drink').click());
    expect(show).toHaveBeenCalled();
  });

  it('should show correct stats', () => {
    const histories = renderHook(() => useHistoriesStore());

    render(<HistoriesModal />);
    act(() => histories.result.current.drink(Date.now(), 100));
    expect(screen.getByText('1 Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('100/2500ml · 4%')).toBeInTheDocument();
    act(() => histories.result.current.reset());
  });

  it('should remove a history', () => {
    const histories = renderHook(() => useHistoriesStore());
    const remove = vi.spyOn(histories.result.current, 'remove');

    render(<HistoriesModal />);
    act(() => histories.result.current.drink(Date.now(), 100));
    expect(screen.getAllByTestId('histories-modal-item')).toHaveLength(1);
    act(() => screen.getByTestId('histories-modal-remove-history').click());
    expect(remove).toHaveBeenCalledWith(Date.now().toString());
    expect(screen.queryAllByTestId('histories-modal-item')).toHaveLength(0);
  });
});
