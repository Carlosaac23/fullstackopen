import Filter from "./components/filter";
import NoteForm from "./components/note-form";
import NoteList from "./components/note-list";

export default function App() {
  return (
    <div>
      <NoteForm />
      <Filter />
      <NoteList />
    </div>
  );
}
