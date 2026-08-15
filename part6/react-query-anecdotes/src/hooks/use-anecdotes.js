import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes, updateAnecdote } from "../requests";
import { useNotification } from "./use-notification";

export function useAnecdotes() {
  const { setNotification } = useNotification();
  const queryClient = useQueryClient();

  const {
    data: anecdotes,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (payload) => {
      queryClient.setQueryData(["anecdotes"], (anecdotes) => [...anecdotes, payload]);

      setNotification(`Anecdote "${payload.content}" created!`);
    },
    onError: (error) => {
      setNotification(error.message);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (payload) => {
      queryClient.setQueryData(["anecdotes"], (anecdotes) =>
        anecdotes.map((anecdote) => (anecdote.id === payload.id ? payload : anecdote)),
      );

      setNotification(`Anecdote "${payload.content}" voted!`);
    },
  });

  return {
    anecdotes,
    isPending,
    isError,
    error,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteUp: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
}
