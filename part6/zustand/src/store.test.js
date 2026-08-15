import { beforeEach, describe, expect, it } from "vitest";
import useCounterStore from "./store";

beforeEach(() => {
  useCounterStore.setState({ counter: 0 });
});

describe("counter store", () => {
  it("initial state is 0", () => {
    expect(useCounterStore.getState().counter).toBe(0);
  });

  it("increment action increases counter by 1", () => {
    useCounterStore.getState().actions.increment();
    expect(useCounterStore.getState().counter).toBe(1);
  });

  it("decrement action decreases counter by 1", () => {
    useCounterStore.getState().actions.decrement();
    expect(useCounterStore.getState().counter).toBe(-1);
  });

  it("zero action resets counter to 0", () => {
    useCounterStore.getState().actions.increment();
    useCounterStore.getState().actions.decrement();
    useCounterStore.getState().actions.zero();
    expect(useCounterStore.getState().counter).toBe(0);
  });
});
