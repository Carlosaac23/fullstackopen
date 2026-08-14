import { useNoteActions } from '../store';

export default function NoteForm() {
  const { add } = useNoteActions();

  const addNote = async e => {
    e.preventDefault();

    const content = e.target.note.value;
    await add(content);

    e.target.reset();
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />

      <button type="submit">add</button>
    </form>
  );
}
