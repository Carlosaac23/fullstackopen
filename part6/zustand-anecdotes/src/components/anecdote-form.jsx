import { useAnecdoteActions } from "../store";

export default function AnecdoteForm() {
  const { add } = useAnecdoteActions();

  const generateId = () => Number((100000 * Math.random()).toFixed(0));

  const addAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    add({ id: generateId(), content, votes: 0 });

    e.target.reset();
  };

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
