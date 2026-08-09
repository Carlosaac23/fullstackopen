import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const handleNoteSubmit = e => {
    e.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    navigate('/notes')
    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleNoteSubmit}>
        <label>
          content
          <input
            value={newNote}
            onChange={({ target }) => setNewNote(target.value)}
            placeholder='write note content here'
          />
        </label>

        <button type='submit'>Save</button>
      </form>
    </div>
  )
}
