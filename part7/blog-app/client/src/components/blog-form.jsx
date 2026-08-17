import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createBlogService } from '../services/blogs'

export default function BlogForm({ user, setBlogs, setNotification }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      const newBlog = { title, author: author || user.name, url }
      const createdBlog = await createBlogService(newBlog)

      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({
        message: `A new blog "${newBlog.title}" by ${user.name} added`,
        type: 'success',
      })
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog])
      navigate('/')
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>Add new blog</h2>

      <div>
        <TextField
          type='text'
          label='Title'
          variant='outlined'
          size='small'
          margin='dense'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id='title'
        />
      </div>
      <div>
        <TextField
          type='text'
          label='Author'
          variant='outlined'
          size='small'
          margin='dense'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id='author'
        />
      </div>
      <div>
        <TextField
          type='text'
          label='URL'
          variant='outlined'
          size='small'
          margin='dense'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id='url'
        />
      </div>

      <Button type='submit' variant='contained' color='primary'>
        Create
      </Button>
    </form>
  )
}
