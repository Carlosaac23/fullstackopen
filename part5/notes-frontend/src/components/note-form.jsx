import { useState } from 'react'

export default function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('')

  const handleNoteSubmit = e => {
    e.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleNoteSubmit}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}
