import { useEffect, useRef, useState } from 'react'

import Footer from './components/footer'
import LoginForm from './components/login-form'
import Note from './components/note'
import NoteForm from './components/note-form'
import Notification from './components/notification'
import Togglable from './components/togglable'
import { loginService } from './services/login'
import {
  getAllNotesService,
  createNoteService,
  updateNoteService,
  setToken,
} from './services/notes'

export default function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })
  const noteFormRef = useRef()

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

      noteFormRef.current.toggleVisibility()
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
        setErrorMessage(`Note ${note.content} was already removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(note => note.id !== id))
        console.error(error)
      })
  }

  const login = async credentials => {
    try {
      const user = await loginService(credentials)

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm login={login} />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel='New note' ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Togglable>
  )

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}
