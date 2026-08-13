import { useNoteActions } from "../store";

export default function NoteForm() {
  const { add } = useNoteActions();

  const generateId = () => Number((Math.random() * 10000).toFixed(0));

  const addNote = (e) => {
    e.preventDefault();

    const content = e.target.note.value;
    add({ id: generateId(), content, important: false });

    e.target.reset();
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />

      <button type="submit">add</button>
    </form>
  );
}
