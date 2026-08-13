import { useUnicafeActions } from "../store";

export default function Buttons() {
  const { incrementGood, incrementNeutral, incrementBad } = useUnicafeActions();

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  );
}
