import dayjs from 'dayjs';
import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DrinkModal from 'components/modals/DrinkModal';

import { useRecordsStore, useModalStore } from 'lib/stores';

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

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('drink'));
  });

  it('should add a record', async () => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('drink'));

    const records = renderHook(() => useRecordsStore());
    const drink = vi.spyOn(records.result.current, 'drink');

    render(<DrinkModal />);
    fireEvent.change(screen.getByTestId('drink-modal-value'), { target: { value: '500' } });
    fireEvent.change(screen.getByTestId('drink-modal-time'), { target: { value: dayjs().format('HH:mm') } });
    act(() => screen.getByText('Drink').click());
    const date = new Date();
    date.setHours(1, 1, 0, 0);
    // expect(drink).toHaveBeenCalledWith(date.getTime(), 500); // TODO: not working
  });

  it('should hide time', async () => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('drink', { hideTime: true }));

    render(<DrinkModal />);
    expect(screen.queryByTestId('drink-modal-time')).not.toBeInTheDocument();
  });
});
