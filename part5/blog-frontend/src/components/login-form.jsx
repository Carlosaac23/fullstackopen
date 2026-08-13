import { Button, TextField } from '@mui/material'
import { useState } from 'react'

export default function LoginForm({ login }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    login({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <div>
        <TextField
          type='text'
          label='Username'
          variant='standard'
          margin='dense'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          type='password'
          label='Password'
          variant='standard'
          margin='dense'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <Button variant='contained' color='primary' type='submit'>
        Login
      </Button>
    </form>
  )
}
