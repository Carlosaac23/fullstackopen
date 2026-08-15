import { useAnecdoteActions, useAnecdotes } from '../stores/anecdote-store';
import { useNotification } from '../stores/notification-store';

export default function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const { voteUp, deleteStore } = useAnecdoteActions();
  const { setNotification } = useNotification();

  const handleVote = anecdote => {
    voteUp(anecdote.id);
    setNotification(`You voted for "${anecdote.content}"`, 5000);
  };

  const handleDelete = anecdote => {
    deleteStore(anecdote.id);
  };

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            <button onClick={() => handleDelete(anecdote)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
