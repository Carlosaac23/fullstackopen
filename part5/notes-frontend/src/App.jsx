import { useEffect, useState } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Footer from './components/footer'
import Home from './components/home'
import Note from './components/note'
import NoteForm from './components/note-form'
import NoteList from './components/note-list'
import {
  getAllNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
} from './services/notes'

export default function App() {
  const [notes, setNotes] = useState([])

  const match = useMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === match.params.id) : null

  useEffect(() => {
    async function fetchNotes() {
      const notes = await getAllNotesService()

      setNotes(notes)
    }

    fetchNotes()
  }, [])

  const createNote = async noteObject => {
    try {
      const createdNote = await createNoteService(noteObject)

      setNotes([...notes, createdNote])
    } catch (error) {
      console.error('addNote', error)
    }
  }

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id)
    const updatedNote = { ...note, important: !note.important }

    updateNoteService(id, updatedNote)
      .then(returnedNote =>
        setNotes(notes.map(note => (note.id === id ? returnedNote : note))),
      )
      .catch(error => {
        console.error(error)
      })
  }

  const handleDeleteNote = async id => {
    await deleteNoteService(id)

    setNotes(prevBlogs => prevBlogs.filter(blog => blog.id !== id))
  }

  const padding = {
    padding: 5,
  }

  return (
    <>
      <div>
        <Link style={padding} to='/'>
          home
        </Link>
        <Link style={padding} to='/notes'>
          notes
        </Link>
        <Link style={padding} to='/create'>
          new note
        </Link>
      </div>

      <Routes>
        <Route
          path='/notes/:id'
          element={
            <Note
              note={note}
              toggleImportance={toggleImportanceOf}
              deleteNote={handleDeleteNote}
            />
          }
        />
        <Route path='/notes' element={<NoteList notes={notes} />} />
        <Route path='/create' element={<NoteForm createNote={createNote} />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}
