import { renderHook, act } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import AnecdoteList from '../components/anecdote-list';

vi.mock('../services/anecdotes.js', () => ({
  getAllAnecdotes: vi.fn(),
  createAnecdote: vi.fn(),
  voteAnecdote: vi.fn(),
}));

import { getAllAnecdotes, createAnecdote, voteAnecdote } from '../services/anecdotes';
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdote-store';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }];
    getAllAnecdotes.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });
});

describe('AnecdoteList', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'A', votes: 0 },
        { id: 2, content: 'B', votes: 5 },
        { id: 3, content: 'C', votes: 2 },
      ],
    });
  });

  it('renders anecdotes sorted by votes, highest first', () => {
    render(<AnecdoteList />);

    const contests = screen.getAllByText(/^[ABC]$/).map(element => element.textContent);

    expect(contests).toEqual(['B', 'C', 'A']);
  });
});
