import { Link } from 'react-router-dom'

export default function BlogList({ blogs, user }) {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>

      {user && <p>{user.name} logged in </p>}

      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
