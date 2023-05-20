import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import GoalModal from 'components/modals/GoalModal';

import { useModalStore } from 'lib/stores';

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
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('goal'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('goal'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should update the goal using buttons', async () => {
    render(<GoalModal />);
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2500);
    act(() => screen.getByTestId('goal-modal-increase').click());
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2600);
    act(() => screen.getByTestId('goal-modal-decrease').click());
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2500);
    // TODO: setGoal
  });

  it('should update the goal using input', async () => {
    render(<GoalModal />);
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2500);
    fireEvent.change(screen.getByTestId('goal-modal-input'), { target: { value: '2501' } });
    expect(screen.getByTestId('goal-modal-input')).toHaveValue(2501);
    // TODO: setGoal
  });

  // TODO: value <= constants.MAX_VALUE
});
