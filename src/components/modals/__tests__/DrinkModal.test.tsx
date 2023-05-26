import dayjs from 'dayjs';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DrinkModal from 'components/modals/DrinkModal';

import { useAppStore, recordsStore, useRecordsStore } from 'lib/stores';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

describe('DrinkModal', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    act(() => useAppStore.setState({ items: { drink: true } }));
  });

  afterEach(async () => {
    act(() => useAppStore.setState({ items: {} }));
  });

  it('should add a record', async () => {
    const records = renderHook(() => useRecordsStore());
    const drink = vi.spyOn(records.result.current, 'drink');

    render(<DrinkModal />);
    const value = screen.getByTestId('drink-modal-value');
    const time = screen.getByTestId('drink-modal-time');

    // clean -> dirty & invalid (value > constants.MAX_VALUE && time > now)
    fireEvent.change(value, { target: { value: '10010000' } });
    fireEvent.change(time, { target: { value: dayjs().add(1, 'minute').format('HH:mm') } });
    act(() => screen.getByText('Drink').click());
    expect(drink).not.toHaveBeenCalled();

    // valid (value <= constants.MAX_VALUE && time <= now)
    fireEvent.change(value, { target: { value: '500' } });
    fireEvent.change(time, { target: { value: dayjs().format('HH:mm') } });
    act(() => screen.getByText('Drink').click());
    expect(drink).toHaveBeenCalledWith(dayjs().startOf('minute').valueOf(), 500);
  });

  it('should update a record', async () => {
    const timestamp = dayjs().startOf('minute').subtract(1, 'minute').valueOf();

    act(() => useAppStore.setState({ items: { drink: { timestamp } } }));
    act(() => recordsStore.setState({ records: { [timestamp]: 100 } }));

    const records = renderHook(() => useRecordsStore());
    const update = vi.spyOn(records.result.current, 'update');

    render(<DrinkModal />);
    fireEvent.change(screen.getByTestId('drink-modal-value'), { target: { value: '100200' } });
    act(() => screen.getByText('Drink').click());
    expect(update).toHaveBeenCalledWith(timestamp, 200);
  });

  it('should add a record to past date', async () => {
    const time = dayjs().subtract(1, 'day').startOf('minute').add(1, 'minute');

    const app = renderHook(() => useAppStore());
    await act(() => app.result.current.setDate(time.format('YYYY-MM-DD')));

    const records = renderHook(() => useRecordsStore());
    const drink = vi.spyOn(records.result.current, 'drink');

    render(<DrinkModal />);
    fireEvent.change(screen.getByTestId('drink-modal-time'), { target: { value: time.format('HH:mm') } });
    act(() => screen.getByText('Drink').click());
    expect(drink).toHaveBeenCalledWith(time.valueOf(), 100);

    await act(() => app.result.current.setDate(undefined));
  });

  it('should support negative value', async () => {
    const records = renderHook(() => useRecordsStore());
    const drink = vi.spyOn(records.result.current, 'drink');

    render(<DrinkModal />);
    const value = screen.getByTestId('drink-modal-value');

    fireEvent.keyDown(value, { key: '-' });
    fireEvent.change(value, { target: { value: '-100' } });
    act(() => screen.getByText('Drink').click());
    expect(drink).toHaveBeenCalledWith(dayjs().startOf('minute').valueOf(), -100);
  });

  it('should hide time', async () => {
    act(() => useAppStore.setState({ items: { drink: { hideTime: true } } }));

    render(<DrinkModal />);
    expect(screen.queryByTestId('drink-modal-time')).not.toBeInTheDocument();
  });
});
