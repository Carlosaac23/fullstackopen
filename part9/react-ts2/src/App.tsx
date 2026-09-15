import { useEffect, useState } from "react";
import type { Note } from "./types";
import { getAllNotes, createNote } from "./note-service";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getAllNotes().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNote({ content: newNote }).then((returnedNote) =>
      setNotes((prevNotes) => [...prevNotes, returnedNote]),
    );

    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input type="text" value={newNote} onChange={({ target }) => setNewNote(target.value)} />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}
