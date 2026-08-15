import { useCounter } from "../hooks/use-counter";

export default function Controls() {
  const { increment, decrement, zero } = useCounter();

  return (
    <div>
      <button onClick={increment}>plus</button>
      <button onClick={decrement}>minus</button>
      <button onClick={zero}>zero</button>
    </div>
  );
}
