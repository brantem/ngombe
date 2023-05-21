import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RecordsModal from 'components/modals/RecordsModal';

import { goalStore, useModalStore, useRecordsStore } from 'lib/stores';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

describe('RecordsModal', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    vi.useFakeTimers();
    vi.setSystemTime(new Date('1 January 2023'));

    act(() => goalStore.setState({ goal: 2500, isReady: true }));
  });

  beforeEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('records'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('records'));

    act(() => recordsStore.setState({ records: {} }));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should show empty list', () => {
    render(<RecordsModal />);
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
  });

  it('should open drink modal to add missed drink', () => {
    const modal = renderHook(() => useModalStore());
    const show = vi.spyOn(modal.result.current, 'show');

    render(<RecordsModal />);
    act(() => screen.getByText('Missed Drink').click());
    expect(show).toHaveBeenCalled();
  });

  it('should open drink modal to update record', () => {
    const modal = renderHook(() => useModalStore());
    const show = vi.spyOn(modal.result.current, 'show');

    const records = renderHook(() => useRecordsStore());

    render(<RecordsModal />);
    act(() => records.result.current.drink(Date.now(), 100));
    act(() => screen.getByTestId('records-modal-update').click());
    expect(show).toHaveBeenCalledWith('drink', { timestamp: Date.now(), hideTime: true });
  });

  it('should show correct stats', () => {
    const records = renderHook(() => useRecordsStore());

    render(<RecordsModal />);
    act(() => records.result.current.drink(Date.now(), 100));
    expect(screen.getByText('1 Jan 2023')).toBeInTheDocument();
    expect(screen.getByText('100/2500ml · 4%')).toBeInTheDocument();
  });

  it('should remove a record', () => {
    const records = renderHook(() => useRecordsStore());
    const remove = vi.spyOn(records.result.current, 'remove');

    render(<RecordsModal />);
    act(() => records.result.current.drink(Date.now(), 100));
    expect(screen.getAllByTestId('records-modal-item')).toHaveLength(1);
    act(() => screen.getByTestId('records-modal-remove').click());
    expect(remove).toHaveBeenCalledWith(Date.now());
    expect(screen.queryAllByTestId('records-modal-item')).toHaveLength(0);
  });
});
