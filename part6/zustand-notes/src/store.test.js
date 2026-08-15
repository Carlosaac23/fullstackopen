import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./services/notes', () => ({
  getAllNotes: vi.fn(),
  createNote: vi.fn(),
  updateNote: vi.fn(),
}));

import { getAllNotes, createNote, updateNote } from './services/notes';
import useNoteStore, { useNotes, useFilter, useNoteActions } from './store';

beforeEach(() => {
  useNoteStore.setState({ notes: [], filter: '' });
  vi.clearAllMocks();
});

describe('useNoteActions', () => {
  it('initialize loads notes from the service', async () => {
    const mockNotes = [{ id: 1, content: 'Test', important: false }];
    getAllNotes.mockResolvedValue(mockNotes);

    const { result } = renderHook(() => useNoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: notesResult } = renderHook(() => useNotes());
    expect(notesResult.current).toEqual(mockNotes);
  });

  it('add appends a new note', async () => {
    const newNote = { id: 2, content: 'New note', important: false };
    createNote.mockResolvedValue(newNote);

    const { result } = renderHook(() => useNoteActions());

    await act(async () => {
      await result.current.add('New note');
    });

    const { result: notesResult } = renderHook(() => useNotes());
    expect(notesResult.current).toContainEqual(newNote);
  });

  it('toggleImportance flips important flag', async () => {
    const note = { id: 1, content: 'Test', important: false };
    useNoteStore.setState({ notes: [note] });
    updateNote.mockResolvedValue({ ...note, important: true });

    const { result } = renderHook(() => useNoteActions());

    await act(async () => {
      await result.current.toggleImportance(1);
    });

    const { result: notesResult } = renderHook(() => useNotes());
    expect(notesResult.current[0].important).toBe(true);
  });
});

describe('useNotes filtering', () => {
  const notes = [
    { id: 1, content: 'Note A', important: true },
    { id: 2, content: 'Note B', important: false },
  ];

  beforeEach(() => {
    useNoteStore.setState({ notes });
  });

  it('returns all notes with no filter', () => {
    const { result } = renderHook(() => useNotes());
    expect(result.current).toHaveLength(2);
  });

  it('filter important notes', () => {
    useNoteStore.setState({ notes, filter: 'important' });

    const { result } = renderHook(() => useNotes());
    expect(result.current).toEqual([notes[0]]);
  });

  it('filter not important notes', () => {
    useNoteStore.setState({ notes, filter: 'not-important' });

    const { result } = renderHook(() => useNotes());
    expect(result.current).toEqual([notes[1]]);
  });
});
