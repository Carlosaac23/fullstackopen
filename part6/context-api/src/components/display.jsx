import { useCounter } from "../hooks/use-counter";

export default function Display() {
  const { counter } = useCounter();

  return <div>{counter}</div>;
}
