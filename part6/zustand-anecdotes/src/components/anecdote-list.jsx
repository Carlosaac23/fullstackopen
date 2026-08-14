import { useAnecdoteActions, useAnecdotes } from "../store";

export default function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const { voteUp } = useAnecdoteActions();

  const vote = (id) => voteUp(id);
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}
