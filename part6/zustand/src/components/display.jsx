import { useCounter } from "../store";

export default function Display() {
  const counter = useCounter();

  return <div>{counter}</div>;
}
