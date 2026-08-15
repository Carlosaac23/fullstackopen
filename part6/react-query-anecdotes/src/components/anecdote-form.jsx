import { useAnecdotes } from "../hooks/use-anecdotes";

export default function AnecdoteForm() {
  const { addAnecdote } = useAnecdotes();

  const handleCreateAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.reset();

    addAnecdote(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreateAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
}
