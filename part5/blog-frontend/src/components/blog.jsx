import { Container, Typography, Link, Button } from '@mui/material'
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
    <Container
      sx={{ boxShadow: 1, borderRadius: 2, padding: 2 }}
      className='blog'
    >
      <Typography variant='h6' sx={{ margin: 1 }}>
        {blog?.author}: {blog?.title}
      </Typography>

      <Typography sx={{ color: 'gray' }}>By {blog?.author}</Typography>
      <Link href={blog?.url} underline='always'>
        {blog?.url}
      </Link>
      <Typography>
        likes <span className='like-span'>{blog?.likes}</span>{' '}
        {user && (
          <>
            <Button
              sx={{ marginLeft: 1, marginRight: 1 }}
              variant='outlined'
              color='primary'
              onClick={handleLikes}
            >
              Like
            </Button>
            {user?.username === blog?.user?.username && (
              <Button variant='outlined' color='error' onClick={handleDelete}>
                Delete
              </Button>
            )}
          </>
        )}
      </Typography>
    </Container>
  )
}
