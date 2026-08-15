import { useContext } from "react";
import CounterContext from "../counter-context";

export function useCounter() {
  return useContext(CounterContext);
}
