import { useEffect, useState } from "react";
import { createAnecdote, deleteAnecdoteById, getAllAnecdotes } from "../services/anecdotes";

export function useField(type) {
  const [value, setValue] = useState("");

  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue("");

  return {
    inputProps: { type, value, onChange },
    reset,
  };
}

export function useAnecdotes() {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const anecdotes = await getAllAnecdotes();

      setAnecdotes(anecdotes);
    }

    fetchData();
  }, []);

  const addAnecdote = async (payload) => {
    const createdAnecdote = await createAnecdote(payload);

    setAnecdotes((prevAnecdotes) => [...prevAnecdotes, createdAnecdote]);
  };

  const deleteAnecdote = async (id) => {
    await deleteAnecdoteById(id);

    setAnecdotes((prevAnecdotes) => prevAnecdotes.filter((anecdote) => anecdote.id !== id));
  };

  return { anecdotes, addAnecdote, deleteAnecdote };
}
