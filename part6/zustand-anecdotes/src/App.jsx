import { useEffect } from 'react';

import AnecdoteForm from './components/anecdote-form';
import AnecdoteList from './components/anecdote-list';
import Filter from './components/filter';
import Notification from './components/notification';
import { useAnecdoteActions } from './stores/anecdote-store';
import { useNotification } from './stores/notification-store';

export default function App() {
  const { initialize } = useAnecdoteActions();
  const { notification } = useNotification();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification notification={notification} />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}
