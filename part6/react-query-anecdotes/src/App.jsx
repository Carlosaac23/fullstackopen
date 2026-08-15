import AnecdoteForm from "./components/anecdote-form";
import Notification from "./components/notification";
import { useAnecdotes } from "./hooks/use-anecdotes";

export default function App() {
  const { anecdotes, isError, isPending, error, voteUp } = useAnecdotes();

  if (isError) {
    return (
      <div>
        <p>anecdote service not available due to problems in server</p>
        <p>error message: {error.message}</p>
      </div>
    );
  }

  if (isPending) {
    return <div>loading data...</div>;
  }

  const handleVote = (anecdote) => voteUp(anecdote);

  return (
    <div>
      <h1>Anecdote app</h1>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
