import { Container, AppBar, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Footer from './components/footer'
import Home from './components/home'
import Note from './components/note'
import NoteForm from './components/note-form'
import NoteList from './components/note-list'
import Notification from './components/notification'
import {
  getAllNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
} from './services/notes'
import { setToken } from './services/notes'

export default function App() {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })

  const match = useMatch('/notes/:id')
  const note = match ? notes.find(note => note.id === match.params.id) : null

  useEffect(() => {
    async function fetchNotes() {
      const notes = await getAllNotesService()

      setNotes(notes)
    }

    fetchNotes()
  }, [])

  useEffect(() => {
    if (user) {
      setToken(user.token)
    }
  }, [])

  const createNote = async noteObject => {
    try {
      const createdNote = await createNoteService(noteObject)

      setNotes([...notes, createdNote])
      setNotification({
        message: `Note "${createdNote.content}" added!`,
        type: 'success',
      })
      setTimeout(() => setNotification(null), 5000)
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

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/' sx={style}>
            home
          </Button>
          <Button color='inherit' component={Link} to='/notes' sx={style}>
            notes
          </Button>
          <Button color='inherit' component={Link} to='/create' sx={style}>
            new note
          </Button>
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />

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
        <Route path='/' element={<Home user={user} setUser={setUser} />} />
      </Routes>

      <Footer />
    </Container>
  )
}
