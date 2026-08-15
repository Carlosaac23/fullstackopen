import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createNote, getAllNotes, updateNote } from './services/notes';

const useNoteStore = create(
  devtools((set, get) => ({
    notes: [],
    filter: 'all',
    actions: {
      add: async content => {
        const newNote = await createNote(content);
        set(state => ({ notes: [...state.notes, newNote] }));
      },
      toggleImportance: async id => {
        const note = get().notes.find(note => note.id === id);
        const updated = await updateNote(id, {
          ...note,
          important: !note.important,
        });
        set(state => ({
          notes: state.notes.map(note => (note.id === id ? updated : note)),
        }));
      },
      setFilter: value => set(() => ({ filter: value })),
      initialize: async () => {
        const notes = await getAllNotes();
        set(() => ({ notes }));
      },
    },
  })),
);

export const useNotes = () => {
  const notes = useNoteStore(state => state.notes);
  const filter = useNoteStore(state => state.filter);
  if (filter === 'important') return notes.filter(n => n.important);
  if (filter === 'not-important') return notes.filter(n => !n.important);
  return notes;
};
export const useFilter = () => useNoteStore(state => state.filter);
export const useNoteActions = () => useNoteStore(state => state.actions);
