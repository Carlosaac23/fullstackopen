import { useState } from 'react'

export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSubmit = (e) => {
    e.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleBlogSubmit}>
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
