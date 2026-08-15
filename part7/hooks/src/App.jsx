import { memo, useState, useCallback } from "react";

const NoteList = memo(({ onDelete, notes }) => {
  console.log("NoteList rendered");
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {note.content}
          <button onClick={() => onDelete(note.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
});

export default function App() {
  const [notes, setNotes] = useState([
    { id: 1, content: "Learn React" },
    { id: 2, content: "Learn hooks" },
    { id: 3, content: "Learn useMemo" },
    { id: 4, content: "Learn useCallback" },
    { id: 5, content: "Build something cool" },
  ]);
  const [newNote, setNewNote] = useState("");

  const handleDelete = useCallback((id) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }, []);

  const handleAdd = () => {
    setNotes((notes) => [...notes, { id: Date.now(), content: newNote }]);
    setNewNote("");
  };

  return (
    <div>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button onClick={handleAdd}>add</button>
      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
}
