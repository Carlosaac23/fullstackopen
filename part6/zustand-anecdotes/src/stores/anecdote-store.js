import { create } from 'zustand';

import {
  createAnecdote,
  getAllAnecdotes,
  voteAnecdote,
  deleteAnecdote,
} from '../services/anecdotes';

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async anecdote => {
      const newAnecdote = await createAnecdote(anecdote);
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }));
    },
    voteUp: async id => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id);
      const updatedAnecdote = await voteAnecdote(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
      }));
    },
    deleteStore: async id => {
      await deleteAnecdote(id);
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id),
      }));
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await getAllAnecdotes();
      set(() => ({ anecdotes }));
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes);
  const filter = useAnecdoteStore(state => state.filter);
  return filter
    ? anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()),
      )
    : anecdotes;
};
export const useAnecdoteActions = () =>
  useAnecdoteStore(state => state.actions);

export default useAnecdoteStore;
