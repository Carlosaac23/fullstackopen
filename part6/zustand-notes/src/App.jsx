import { useEffect } from 'react';

import Filter from './components/filter';
import NoteForm from './components/note-form';
import NoteList from './components/note-list';
import { useNoteActions } from './store';

export default function App() {
  const { initialize } = useNoteActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <NoteForm />
      <Filter />
      <NoteList />
    </div>
  );
}
