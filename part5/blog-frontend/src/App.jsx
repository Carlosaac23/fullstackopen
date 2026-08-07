import { useState, useEffect } from 'react';

import Blog from './components/blog';
import BlogForm from './components/blog-form';
import LoginForm from './components/login-form';
import Notification from './components/notification';
import Togglable from './components/togglable';
import {
  getAllBlogsService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
  setToken,
} from './services/blogs';
import { loginService } from './services/login';

export default function App() {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setToken(user.token);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await getAllBlogsService();

      setBlogs(blogs);
    }

    fetchBlogs();
  }, []);

  const login = async (credentials) => {
    try {
      const user = await loginService(credentials);

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');

    setUser(null);
    setToken(null);
    setNotification({ message: "You've logged out successfully", type: 'success' });
  };

  const createBlog = async (blogData) => {
    try {
      const newBlog = { ...blogData, author: blogData.author || user.name };

      const createdBlog = await createBlogService(newBlog);

      setNotification({
        message: `A new blog "${newBlog.title}" by ${user.name} added`,
        type: 'success',
      });
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const handleLikes = async (id) => {
    const blog = blogs?.find((blog) => blog.id === id);
    const updatedObject = { ...blog, likes: blog.likes + 1 };

    try {
      const updatedBlog = await updateBlogService(id, updatedObject);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id !== id ? blog : { ...blog, likes: updatedBlog.likes })),
      );
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    const blog = blogs?.find((blog) => blog.id === id);
    const isConfirmed = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);

    if (!isConfirmed) return;

    try {
      await deleteBlogService(id);

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' });
      console.error(error);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm login={login} />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog'>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Notification notification={notification} setNotification={setNotification} />

      {!user ? (
        loginForm()
      ) : (
        <div>
          <h1>Blogs</h1>

          <p>
            {user.name} logged in{' '}
            <button type='button' onClick={handleLogout}>
              logout
            </button>
          </p>
          {blogForm()}

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              handleLikes={handleLikes}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
