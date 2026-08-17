import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Blog from './components/blog'
import BlogForm from './components/blog-form'
import BlogList from './components/blog-list'
import ErrorFallback from './components/error-fallback'
import LoginForm from './components/login-form'
import NotFound from './components/not-found'
import Notification from './components/notification'
import { getAllBlogsService, setToken } from './services/blogs'
import { loginService } from './services/login'

export default function App() {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
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
  }, [user])

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

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            {user ? (
              <>
                <Button color='inherit' component={Link} to='/create'>
                  new blog
                </Button>
                <Button color='inherit' onClick={handleLogout}>
                  logout{' '}
                </Button>
              </>
            ) : (
              <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Container>

      <Notification notification={notification} setNotification={setNotification} />

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <Routes>
          <Route path='/' element={<BlogList blogs={blogs} user={user} />} />
          <Route path='/login' element={<LoginForm login={login} />} />
          <Route
            path='/create'
            element={<BlogForm user={user} setBlogs={setBlogs} setNotification={setNotification} />}
          />
          <Route
            path='/blogs/:id'
            element={
              <Blog blog={blog} user={user} setNotification={setNotification} setBlogs={setBlogs} />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}
