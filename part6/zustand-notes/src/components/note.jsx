import { useNoteActions } from "../store";

export default function Note({ note }) {
  const { toggleImportance } = useNoteActions();

  return (
    <li>
      {note.important ? <strong>{note.content}</strong> : note.content}
      <button style={{ marginLeft: 6 }} type="button" onClick={() => toggleImportance(note.id)}>
        {note.important ? "make not important" : "make important"}
      </button>
    </li>
  );
}
