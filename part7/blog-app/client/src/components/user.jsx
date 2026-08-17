import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useUsers } from '../stores/user-store'

export default function User() {
  const { id } = useParams()
  const users = useUsers()
  const user = users.find(user => user.id === id)

  return (
    <div>
      <Typography variant='h4' sx={{ margin: 2 }}>
        {user?.name}
      </Typography>

      <div>
        <Typography variant='h6' sx={{ marginLeft: 2 }}>
          Added blogs
        </Typography>

        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <Typography variant='subtitle2'>{blog.title}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
