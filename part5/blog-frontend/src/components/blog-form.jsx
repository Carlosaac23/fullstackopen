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
        <label>
          title
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url'
          />
        </label>
      </div>

      <button type='submit'>add</button>
    </form>
  )
}
