import { useAnecdotes } from "../hooks";

export default function AnecdoteList() {
  const { anecdotes, deleteAnecdote } = useAnecdotes();

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content} <button onClick={() => deleteAnecdote(anecdote.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
