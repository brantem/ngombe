import { renderHook, act, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TargetModal from 'components/modals/TargetModal';

import { useModalStore } from 'lib/stores';

vi.mock('next/font/google', () => ({
  Nunito() {
    return {
      className: 'nunito',
    };
  },
}));

describe('TargetModal', () => {
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
    act(() => modal.result.current.show('target'));
  });

  afterEach(() => {
    const modal = renderHook(() => useModalStore());
    act(() => modal.result.current.hide('target'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should update the target using buttons', async () => {
    render(<TargetModal />);
    expect(screen.getByTestId('target-modal-input')).toHaveValue(2500);
    act(() => screen.getByTestId('target-modal-increase').click());
    expect(screen.getByTestId('target-modal-input')).toHaveValue(2510);
    act(() => screen.getByTestId('target-modal-decrease').click());
    expect(screen.getByTestId('target-modal-input')).toHaveValue(2500);
    // TODO: setTarget
  });

  it('should update the target using input', async () => {
    render(<TargetModal />);
    expect(screen.getByTestId('target-modal-input')).toHaveValue(2500);
    fireEvent.change(screen.getByTestId('target-modal-input'), { target: { value: '2501' } });
    expect(screen.getByTestId('target-modal-input')).toHaveValue(2501);
    // TODO: setTarget
  });

  // TODO: 0 > value < constants.MAX_VALUE
});
