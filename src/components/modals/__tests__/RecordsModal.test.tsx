import dayjs from 'dayjs';
import { renderHook, act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import RecordsModal, { Header, MissedDrink, Record } from 'components/modals/RecordsModal';

import { useAppStore, goalStore, recordsStore, useRecordsStore } from 'lib/stores';

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
    act(() => useAppStore.setState({ date: undefined }));
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

  it('should change date', async () => {
    const app = renderHook(() => useAppStore());
    const setDate = vi.spyOn(app.result.current, 'setDate');

    render(<Header />);
    const input = screen.getByTestId('records-modal-date');

    expect(screen.getByText(dayjs().format('D MMM YYYY'))).toBeInTheDocument();
    await waitFor(() => fireEvent.change(input, { target: { value: '2023-01-01' } }));
    expect(setDate).toHaveBeenCalledWith('2023-01-01');
    expect(screen.getByText('1 Jan 2023')).toBeInTheDocument();
  });

  it('should open goal modal', () => {
    act(() => useAppStore.setState({ date: '2023-01-01' }));

    const app = renderHook(() => useAppStore());
    const setItem = vi.spyOn(app.result.current, 'setItem');

    render(<Header />);
    expect(screen.getByTestId('records-modal-goal')).toBeInTheDocument();
    act(() => screen.getByTestId('records-modal-stats').click());
    expect(setItem).toHaveBeenCalledWith('goal', true);
  });

  it('should not show edit goal button if date === undefined', () => {
    const app = renderHook(() => useAppStore());
    const setItem = vi.spyOn(app.result.current, 'setItem');

    render(<Header />);
    expect(screen.queryByTestId('records-modal-goal')).not.toBeInTheDocument();
    act(() => screen.getByTestId('records-modal-stats').click());
    expect(setItem).not.toHaveBeenCalledWith('goal', true);
  });
});

test('RecordsModal/MissedDrink', () => {
  const app = renderHook(() => useAppStore());
  const setItem = vi.spyOn(app.result.current, 'setItem');

  render(<MissedDrink />);
  act(() => screen.getByText('Missed Drink').click());
  expect(setItem).toHaveBeenCalledWith('drink', true);
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
    const app = renderHook(() => useAppStore());
    const setItem = vi.spyOn(app.result.current, 'setItem');

    render(<Record timestamp={timestamp} value={100} />);
    act(() => screen.getByTestId('records-modal-update').click());
    expect(setItem).toHaveBeenCalledWith('drink', { timestamp, hideTime: true });
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
    act(() => useAppStore.setState({ items: { records: true } }));
  });

  afterEach(() => {
    act(() => useAppStore.setState({ items: {} }));
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
    const app = renderHook(() => useAppStore());
    const setDate = vi.spyOn(app.result.current, 'setDate').mockImplementationOnce(() => {});

    render(<RecordsModal />);
    act(() => screen.getByTestId('records-modal-close').click());
    expect(setDate).toHaveBeenCalledWith(undefined);
  });
});
