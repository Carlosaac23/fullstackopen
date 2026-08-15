import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotes, createNote, updateNote } from "../requests";

export function useNotes() {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  });

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (payload) => {
      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], [...notes, payload]);
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (payload) => {
      queryClient.setQueryData(["notes"], (notes) =>
        notes.map((note) => (note.id === payload.id ? payload : note)),
      );
    },
  });

  return {
    notes: result.data,
    isPending: result.isPending,
    addNote: (content) => newNoteMutation.mutate({ content, important: true }),
    toggleImportance: (note) => updateNoteMutation.mutate({ ...note, important: !note.important }),
  };
}
