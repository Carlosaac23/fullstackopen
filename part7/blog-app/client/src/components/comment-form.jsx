import { Button, TextField } from '@mui/material'
import { useState } from 'react'

import { useBlogActions } from '../stores/blog-store'

export default function CommentForm({ blog, setNotification }) {
  const { addCommentStore } = useBlogActions()
  const [comment, setComment] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await addCommentStore(blog.id, { comment })

      setComment('')

      setNotification({ message: 'Comment added successfully', type: 'success' })
    } catch (error) {
      setNotification?.({
        message: error.message,
        type: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type='text'
        placeholder='Add a comment'
        size='small'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />

      <Button type='submit' variant='contained' sx={{ marginLeft: 2 }}>
        Add comment
      </Button>
    </form>
  )
}
