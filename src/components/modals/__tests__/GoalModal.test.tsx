import { renderHook, act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import GoalModal from 'components/modals/GoalModal';

import { useModalStore, useGoalStore } from 'lib/stores';

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
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.show('goal'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('goal'));
  });

  it('should save', async () => {
    const goal = renderHook(() => useGoalStore());
    const set = vi.spyOn(goal.result.current, 'set');

    render(<GoalModal />);
    fireEvent.change(screen.getByTestId('goal-modal-value'), { target: { value: '500' } });
    act(() => screen.getByText('Save').click());
    await waitFor(() => expect(set).toHaveBeenCalledWith(undefined, 500));
  });
});
