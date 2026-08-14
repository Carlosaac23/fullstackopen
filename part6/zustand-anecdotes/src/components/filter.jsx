import { useAnecdoteActions } from "../store";

export default function Filter() {
  const { setFilter } = useAnecdoteActions();

  const handleChange = ({ target }) => setFilter(target.value);

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
}
