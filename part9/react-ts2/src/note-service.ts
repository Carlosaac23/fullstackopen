import axios from "axios";
import type { Note, NewNote } from "./types";

const baseUrl = "http://localhost:4000/notes";

export function getAllNotes() {
  return axios<Note[]>(baseUrl).then((res) => res.data);
}

export function createNote(payload: NewNote) {
  return axios.post<Note>(baseUrl, payload).then((res) => res.data);
}
