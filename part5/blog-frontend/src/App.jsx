import { useState, useEffect } from 'react';

import Blog from './components/blog';
import Notification from './components/notification';
import { getAll, createBlog, setToken } from './services/blogs';
import { login } from './services/login';

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      const blogs = await getAll();

      setBlogs(blogs);
    }

    fetchBlogs();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ username, password });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
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

  const handleBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = {
        title,
        author: author || user.name,
        url,
      };

      const createdBlog = await createBlog(newBlog);

      setNotification({ message: `A new blog ${title} by ${user.name} added`, type: 'success' });
      setBlogs([...blogs, createdBlog]);
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <div>
        <label>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>

      <button type='submit'>login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <h2>Add new blog</h2>

      <div>
        <label>
          title
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          author
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>
      <div>
        <label>
          url
          <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>

      <button type='submit'>add</button>
    </form>
  );

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

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
}
