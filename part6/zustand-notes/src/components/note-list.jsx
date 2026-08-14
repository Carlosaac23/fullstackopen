import { useNotes } from '../store';
import Note from './note';

export default function NoteList() {
  const notes = useNotes();

  return (
    <ul>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  );
}
