import { useNavigate } from 'react-router-dom'

import { updateBlogService, deleteBlogService } from '../services/blogs'

export default function Blog({ blog, user, setNotification, setBlogs }) {
  const navigate = useNavigate()

  const handleLikes = async () => {
    const updatedObject = { ...blog, likes: blog.likes + 1 }

    try {
      const updatedBlog = await updateBlogService(blog?.id, updatedObject)

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id !== updatedBlog.id
            ? blog
            : { ...blog, likes: updatedBlog.likes },
        ),
      )
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Remove blog "${blog?.title}" by ${blog?.author}?`,
    )

    if (!isConfirmed) return

    try {
      await deleteBlogService(blog?.id)

      setBlogs((prevBlogs) => prevBlogs.filter((item) => item.id !== blog?.id))
      setNotification({ message: 'Blog deleted successfully', type: 'success' })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='blog'>
      <h3>
        {blog?.author}: {blog?.title}
      </h3>

      <a style={{ margin: 0, display: 'block' }} href={blog?.url}>
        {blog?.url}
      </a>
      <p style={{ margin: 0 }}>
        likes <span className='like-span'>{blog?.likes}</span>{' '}
        {user && (
          <button type='button' onClick={handleLikes}>
            Like
          </button>
        )}
      </p>
      <p style={{ margin: 0 }}>Added by {blog?.author}</p>
      {user?.username === blog?.user.username && (
        <button type='button' onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  )
}
