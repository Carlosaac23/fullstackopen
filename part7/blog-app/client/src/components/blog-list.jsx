import { Link } from 'react-router-dom'

import { useBlogs } from '../stores/blog-store'

export default function BlogList({ user }) {
  const blogs = useBlogs()
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>

      {user && <p>{user.name} logged in </p>}

      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
