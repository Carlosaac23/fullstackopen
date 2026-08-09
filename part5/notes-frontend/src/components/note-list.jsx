import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { loginService } from '../services/login'
import { setToken } from '../services/notes'
import LoginForm from './login-form'
import Notification from './notification'
import Togglable from './togglable'

export default function NoteList({ notes }) {
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })
  const noteFormRef = useRef()

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

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm login={login} />
    </Togglable>
  )

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
