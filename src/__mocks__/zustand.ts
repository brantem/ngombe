import { create as actualCreate, StateCreator } from 'zustand';
import { act } from '@testing-library/react';

const storeResetFns = new Set<() => void>();

const create = () => {
  return <S>(createState: StateCreator<S>) => {
    const store = actualCreate(createState);
    const initialState = store.getState();
    storeResetFns.add(() => store.setState(initialState, true));
    return store;
  };
};

beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});

export default create;
