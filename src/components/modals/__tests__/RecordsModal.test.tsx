import { renderHook, act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RecordsModal, { Header, MissedDrink, Record } from 'components/modals/RecordsModal';

import { useDateStore, goalStore, useModalStore, recordsStore, useRecordsStore, useGoalStore } from 'lib/stores';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

const timestamp = Date.now();

describe('RecordsModal/Header', () => {
  beforeEach(() => {
    act(() => goalStore.setState({ value: 2500 }));
    act(() => recordsStore.setState({ records: { [timestamp]: 100 } }));
  });

  it('should show full header', () => {
    render(<Header />);
    expect(screen.getByText('100/2500ml · 4%')).toBeInTheDocument();
  });

  it('should only show total value', () => {
    act(() => goalStore.setState({ value: 0 }));

    render(<Header />);
    expect(screen.getByText('100ml')).toBeInTheDocument();
  });

  it('should open goal modal', () => {
    const modal = renderHook(() => useModalStore());
    const show = vi.spyOn(modal.result.current, 'show');

    render(<Header />);
    act(() => screen.getByTestId('records-modal-stats').click());
    expect(show).toHaveBeenCalledWith('goal', undefined);
  });
});

test('RecordsModal/MissedDrink', () => {
  const modal = renderHook(() => useModalStore());
  const show = vi.spyOn(modal.result.current, 'show');

  render(<MissedDrink />);
  act(() => screen.getByText('Missed Drink').click());
  expect(show).toHaveBeenCalledWith('drink', undefined);
});

describe('RecordsModal/Record', () => {
  beforeEach(() => {
    act(() => goalStore.setState({ value: 2500 }));
    act(() => recordsStore.setState({ records: { [timestamp]: 100 } }));
  });

  it('should hide percentage if goal === 0', () => {
    act(() => goalStore.setState({ value: 0 }));

    render(<Record timestamp={timestamp} value={100} />);
    expect(screen.queryByTestId('records-modal-recor-percentage')).not.toBeInTheDocument();
  });

  it('should open drink modal to update record', () => {
    const modal = renderHook(() => useModalStore());
    const show = vi.spyOn(modal.result.current, 'show');

    render(<Record timestamp={timestamp} value={100} />);
    act(() => screen.getByTestId('records-modal-update').click());
    expect(show).toHaveBeenCalledWith('drink', { timestamp, hideTime: true });
  });

  it('should remove a record', () => {
    const records = renderHook(() => useRecordsStore());
    const remove = vi.spyOn(records.result.current, 'remove');

    render(<Record timestamp={timestamp} value={100} />);
    act(() => screen.getByTestId('records-modal-remove').click());
    expect(remove).toHaveBeenCalledWith(timestamp);
  });
});

describe('RecordsModal', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('records'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('records'));
  });

  it('should show empty list', () => {
    act(() => recordsStore.setState({ records: {} }));

    render(<RecordsModal />);
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument();
  });

  it('should show render records', () => {
    act(() => recordsStore.setState({ records: { 0: 100, 1: 100 } }));

    render(<RecordsModal />);
    expect(screen.getAllByTestId('records-modal-record')).toHaveLength(2);
  });

  it('should reset date modal is closed', () => {
    const date = renderHook(() => useDateStore());
    const set = vi.spyOn(date.result.current, 'set').mockImplementationOnce(() => {});

    render(<RecordsModal />);
    act(() => screen.getByTestId('records-modal-close').click());
    expect(set).toHaveBeenCalledWith(undefined);
  });
});
