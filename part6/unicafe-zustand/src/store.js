import { create } from "zustand";

const useUnicafeStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
  },
}));

export const useGood = () => useUnicafeStore((state) => state.good);
export const useNeutral = () => useUnicafeStore((state) => state.neutral);
export const useBad = () => useUnicafeStore((state) => state.bad);

const selectAll = (state) => state.good + state.neutral + state.bad;
export const useAll = () => useUnicafeStore(selectAll);
export const useAverage = () =>
  useUnicafeStore((state) => {
    const all = selectAll(state);
    if (all === 0) return 0;
    return (state.good - state.bad) / all;
  });

export const usePositive = () =>
  useUnicafeStore((state) => {
    const all = selectAll(state);
    if (all === 0) return 0;
    return (state.good / all) * 100;
  });
export const useUnicafeActions = () => useUnicafeStore((state) => state.actions);
