import { createContext, useState } from "react";

const CounterContext = createContext();

export function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const zero = () => setCounter(0);

  return (
    <CounterContext.Provider value={{ counter, setCounter, increment, decrement, zero }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterContext;
