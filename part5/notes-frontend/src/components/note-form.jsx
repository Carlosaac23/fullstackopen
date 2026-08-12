import { TextField, Button } from '@mui/material'
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

    setNewNote('')
    navigate('/notes')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleNoteSubmit}>
        <TextField
          label='note content'
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />

        <div>
          <Button type='submit' variant='contained' style={{ marginTop: 10 }}>
            save
          </Button>
        </div>
      </form>
    </div>
  )
}
