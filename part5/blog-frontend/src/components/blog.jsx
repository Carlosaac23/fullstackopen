import { useState } from 'react'

export default function Blog({ blog, user, handleLikes, handleDelete }) {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      <button
        style={{ marginLeft: '4px' }}
        type='button'
        onClick={toggleVisibility}
      >
        {visible ? 'Hide' : 'View'}
      </button>
      {visible && (
        <>
          <a style={{ margin: 0, display: 'block' }} href={blog.url}>
            {blog.url}
          </a>
          <p style={{ margin: 0 }}>
            likes {blog.likes}{' '}
            <button type='button' onClick={() => handleLikes(blog.id)}>
              Like
            </button>
          </p>
          <p style={{ margin: 0 }}>{blog.author}</p>
          {user.username === blog.user.username && (
            <button type='button' onClick={() => handleDelete(blog.id)}>
              Delete
            </button>
          )}
        </>
      )}
    </div>
  )
}
