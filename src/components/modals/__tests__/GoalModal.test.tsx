import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GoalModal from 'components/modals/GoalModal';

import { goalStore, useGoalStore, useModalStore } from 'lib/stores';
import * as constants from 'data/constants';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

describe('GoalModal', () => {
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
    act(() => goalStore.setState({ value: 2500 }));

    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('goal'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('goal'));

    vi.restoreAllMocks();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should decrease the goal using decrease button', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set').mockImplementationOnce(() => {});

    render(<GoalModal />);
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2500);
    act(() => screen.getByTestId('goal-modal-decrease').click());
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2400);
    act(() => vi.advanceTimersByTime(500));
    expect(set).toHaveBeenCalledWith(undefined, 2400);
  });

  it('should increase the goal using increase button', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set').mockImplementationOnce(() => {});

    render(<GoalModal />);
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2500);
    act(() => screen.getByTestId('goal-modal-increase').click());
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2600);
    act(() => vi.advanceTimersByTime(500));
    expect(set).toHaveBeenCalledWith(undefined, 2600);
  });

  it('should update the goal using input', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set').mockImplementation(() => {});

    render(<GoalModal />);
    const input = screen.getByTestId('goal-modal-input');
    expect(input).toHaveValue(2500);

    // same value
    fireEvent.change(input, { target: { value: '2500' } });
    expect(set).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(500));
    expect(set).not.toHaveBeenCalled();

    // NaN
    fireEvent.change(input, { target: { value: 'a' } });
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

  // TODO: value <= constants.MAX_VALUE
});
