import { useNotes } from "./hooks/use-notes";

const App = () => {
  const { notes, isPending, addNote, toggleImportance } = useNotes();

  const handleAddNote = async (e) => {
    e.preventDefault();

    const content = e.target.note.value;
    e.target.reset();

    addNote(content);
  };

  if (isPending) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={handleAddNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id}>
          {note.important ? <strong>{note.content}</strong> : note.content}
          <button onClick={() => toggleImportance(note)}>
            {note.important ? "make not important" : "make important"}
          </button>
        </li>
      ))}
    </div>
  );
};

export default App;
