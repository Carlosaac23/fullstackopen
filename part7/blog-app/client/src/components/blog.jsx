import { Container, Typography, Link, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useBlogActions } from '../stores/blog-store'
import CommentForm from './comment-form'

export default function Blog({ blog, user, setNotification }) {
  const { likeBlogStore, deleteBlogStore } = useBlogActions()
  const navigate = useNavigate()

  if (!blog) return null

  const comments = blog.comments ?? []

  const handleLikes = async () => {
    try {
      likeBlogStore(blog.id)

      setNotification({ message: `Blog ${blog.title} liked!`, type: 'success' })
    } catch (error) {
      console.error('error', error)
      setNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(`Remove blog "${blog?.title}" by ${blog?.author}?`)

    if (!isConfirmed) return

    try {
      await deleteBlogStore(blog.id)

      setNotification({ message: 'Blog deleted successfully', type: 'success' })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container sx={{ boxShadow: 1, borderRadius: 2, padding: 2, marginTop: 2 }} className='blog'>
      <Typography variant='h6'>{blog?.title}</Typography>

      <Typography sx={{ color: 'gray' }}>By {blog?.author}</Typography>
      <Link href={blog?.url} underline='always'>
        {blog?.url}
      </Link>
      <Typography>
        <span className='like-span'>{blog?.likes}</span> likes
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

      <Typography variant='h6' sx={{ marginTop: 1, marginBottom: 1 }}>
        Comments
      </Typography>

      <CommentForm blog={blog} setNotification={setNotification} />

      {blog?.comments?.length === 0 ? (
        <Typography variant='subtitle2'>No comments</Typography>
      ) : (
        <ul style={{ paddingLeft: 12 }}>
          {comments.map((comment, i) => (
            <li key={`${comment}-${i}`}>
              <Typography variant='subtitle2'>{comment}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
