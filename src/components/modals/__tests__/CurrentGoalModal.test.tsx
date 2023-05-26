import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CurrentGoalModal from 'components/modals/CurrentGoalModal';

import { useAppStore, goalStore, useGoalStore } from 'lib/stores';
import * as constants from 'data/constants';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

describe('CurrentGoalModal', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    act(() => useAppStore.setState({ items: { 'current-goal': true } }));
    act(() => goalStore.setState({ value: 2500 }));
  });

  afterEach(() => {
    act(() => useAppStore.setState({ items: {} }));
    vi.restoreAllMocks();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should decrease the goal using decrease button', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set').mockImplementationOnce(() => {});

    render(<CurrentGoalModal />);
    expect(screen.getByTestId('current-goal-modal-input')).toHaveValue(2500);
    act(() => screen.getByTestId('current-goal-modal-decrease').click());
    expect(screen.getByTestId('current-goal-modal-input')).toHaveValue(2400);
    act(() => vi.advanceTimersByTime(500));
    expect(set).toHaveBeenCalledWith(undefined, 2400);
  });

  it('should increase the goal using increase button', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set').mockImplementationOnce(() => {});

    render(<CurrentGoalModal />);
    expect(screen.getByTestId('current-goal-modal-input')).toHaveValue(2500);
    act(() => screen.getByTestId('current-goal-modal-increase').click());
    expect(screen.getByTestId('current-goal-modal-input')).toHaveValue(2600);
    act(() => vi.advanceTimersByTime(500));
    expect(set).toHaveBeenCalledWith(undefined, 2600);
  });

  it('should update the goal using input', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set').mockImplementation(() => {});

    render(<CurrentGoalModal />);
    const input = screen.getByTestId('current-goal-modal-input');
    expect(input).toHaveValue(2500);

    // same value
    fireEvent.change(input, { target: { value: '25002500' } });
    expect(set).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(500));
    expect(set).not.toHaveBeenCalled();

    // < 100
    fireEvent.change(input, { target: { value: '99' } });
    expect(set).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(500));
    expect(set).not.toHaveBeenCalled();

    // > constants.MAX_VALUE
    fireEvent.change(input, { target: { value: (constants.MAX_VALUE + 1).toString() } });
    expect(set).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(500));
    expect(set).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '2501' } });
    expect(input).toHaveValue(2501);
    act(() => vi.advanceTimersByTime(500));
    expect(set).toHaveBeenCalledWith(undefined, 2501);
  });
});
