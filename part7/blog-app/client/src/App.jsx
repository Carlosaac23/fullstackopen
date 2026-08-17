import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
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
import User from './components/user'
import UserList from './components/user-list'
import { useAuth, useAuthActions } from './stores/auth-store'
import { useBlogActions, useBlogs } from './stores/blog-store'
import { useNotification } from './stores/notification-store'
import { useUserActions } from './stores/user-store'

export default function App() {
  const { notification, setNotification } = useNotification()
  const { initialize: initializeAuth, login, logout } = useAuthActions()
  const { initialize: initializeBlogs } = useBlogActions()
  const { initialize: initializeUsers } = useUserActions()
  const user = useAuth()
  const blogs = useBlogs()
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null
  const navigate = useNavigate()

  useEffect(() => {
    initializeAuth()
    initializeBlogs()
    initializeUsers()
  }, [initializeBlogs, initializeAuth, initializeUsers])

  const handleLogin = async credentials => {
    try {
      await login(credentials)

      navigate('/')
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const handleLogout = () => {
    logout()
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

            {user && <Typography sx={{ marginRight: 2 }}>Welcome, {user.name}!</Typography>}

            <Button color='inherit' component={Link} to='/'>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
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
          <Route path='/' element={<BlogList user={user} />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/login' element={<LoginForm login={handleLogin} />} />
          <Route
            path='/create'
            element={<BlogForm user={user} setNotification={setNotification} />}
          />
          <Route
            path='/blogs/:id'
            element={<Blog blog={blog} user={user} setNotification={setNotification} />}
          />
          <Route path='/users/:id' element={<User />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}
