import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import LoginForm from './login-form'
import Togglable from './togglable'

export default function NoteList({ notes }) {
  const [showAll, setShowAll] = useState(true)
  const noteFormRef = useRef()

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm login={login} />
    </Togglable>
  )

  return (
    <>
      <h1>Notes</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesToShow.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>{note.user.name}</TableCell>
                <TableCell>{note.important ? 'yes' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
