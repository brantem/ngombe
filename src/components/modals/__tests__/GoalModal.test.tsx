import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GoalModal from 'components/modals/GoalModal';

import { useAppStore, useGoalStore, goalStore } from 'lib/stores';

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

  beforeEach(() => {
    act(() => useAppStore.setState({ items: { goal: true } }));
  });

  afterEach(() => {
    act(() => useAppStore.setState({ items: {} }));
  });

  it('should be able to set goal', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set');

    render(<GoalModal />);
    const input = screen.getByTestId('goal-modal-value');
    const button = screen.getByText('Save');

    act(() => button.click());
    expect(set).not.toHaveBeenCalled();

    expect(input).not.toHaveValue();
    fireEvent.change(input, { target: { value: '500' } });
    expect(input).toHaveValue(500);
    act(() => button.click());
    expect(set).toHaveBeenCalledWith(undefined, 500);
  });

  it('should be able to update goal', async () => {
    act(() => goalStore.setState({ value: 2500 }));

    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set');

    render(<GoalModal />);
    const input = screen.getByTestId('goal-modal-value');
    const button = screen.getByText('Save');

    // when pasting a value into the 'clean' input, it will be appended to the end instead of immediately replacing the current value
    expect(input).toHaveValue(2500);
    fireEvent.change(input, { target: { value: '250010000' } });
    expect(input).toHaveValue(10000);
    act(() => button.click());
    expect(expect(set).not.toHaveBeenCalled());

    // now that the input is dirty, just change the value
    fireEvent.change(input, { target: { value: '500' } });
    expect(input).toHaveValue(500);
    act(() => button.click());
    expect(set).toHaveBeenCalledWith(undefined, 500);
  });

  it('should not replace the value if the first number is 0', async () => {
    act(() => goalStore.setState({ value: 2500 }));

    render(<GoalModal />);
    const input = screen.getByTestId('goal-modal-value');

    // 2500 + 0 -> 25000
    fireEvent.change(input, { target: { value: '25000' } });
    expect(input).toHaveValue(25000);
  });
});
