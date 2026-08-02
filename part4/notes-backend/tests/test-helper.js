import { Note } from '../models/note.js'

export const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

export async function nonExistingId() {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

export async function notesInDb() {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}
