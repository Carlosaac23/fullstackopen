import AnecdoteForm from "./components/anecdote-form";
import AnecdoteList from "./components/anecdote-list";
import Filter from "./components/filter";

export default function App() {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}
