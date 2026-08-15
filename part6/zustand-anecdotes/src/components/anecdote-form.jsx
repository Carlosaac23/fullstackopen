import { useAnecdoteActions } from '../stores/anecdote-store';
import { useNotification } from '../stores/notification-store';

export default function AnecdoteForm() {
  const { add } = useAnecdoteActions();
  const { setNotification } = useNotification();

  const handleAddAnecdote = e => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    add(content);

    setNotification(`You added "${content}" anecdote!`, 5000);
    e.target.reset();
  };

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={handleAddAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
