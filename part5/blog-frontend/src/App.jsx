import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Blog from './components/blog'
import BlogForm from './components/blog-form'
import BlogList from './components/blog-list'
import LoginForm from './components/login-form'
import Notification from './components/notification'
import Togglable from './components/togglable'
import { getAllBlogsService, setToken } from './services/blogs'
import { loginService } from './services/login'

export default function App() {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await getAllBlogsService()

      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    if (user) {
      setToken(user.token)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const user = await loginService(credentials)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      navigate('/')
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')

    setUser(null)
    setToken(null)
    setNotification({
      message: 'You have logged out successfully',
      type: 'success',
    })
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm login={login} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const padding = { padding: 5 }

  return (
    <>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />

      <div>
        <Link style={padding} to='/'>
          home
        </Link>
        {user ? (
          <>
            <Link style={padding} to='/create'>
              new blog
            </Link>
            <button type='button' onClick={handleLogout}>
              logout
            </button>
          </>
        ) : (
          <Link style={padding} to='/login'>
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path='/' element={<BlogList blogs={blogs} user={user} />} />
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route
          path='/create'
          element={
            <BlogForm
              user={user}
              setBlogs={setBlogs}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blog={blog}
              user={user}
              setNotification={setNotification}
              setBlogs={setBlogs}
            />
          }
        />
      </Routes>
    </>
  )
}
