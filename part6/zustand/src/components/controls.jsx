import { useCounterControls } from "../store";

export default function Controls() {
  const { increment, decrement, zero } = useCounterControls();

  return (
    <div>
      <button type="button" onClick={increment}>
        plus
      </button>
      <button type="button" onClick={decrement}>
        minus
      </button>
      <button type="button" onClick={zero}>
        zero
      </button>
    </div>
  );
}
