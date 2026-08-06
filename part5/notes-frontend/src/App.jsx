import { useEffect, useState } from 'react';

import Footer from './components/footer';
import Note from './components/note';
import Notification from './components/notification';
import { login } from './services/login';
import { getAll, create, update, setToken } from './services/notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  console.log('current user', user);

  useEffect(() => {
    getAll().then(notes => setNotes(notes));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setToken(user.token);
      setUser(user);
    }
  }, []);

  const addNote = e => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    create(noteObject).then(returnedNote => {
      setNotes([...notes, returnedNote]);
      setNewNote('');
    });
  };

  const handleNoteChange = e => setNewNote(e.target.value);
  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    update(id, updatedNote)
      .then(returnedNote => setNotes(notes.map(note => (note.id === id ? returnedNote : note))))
      .catch(error => {
        setErrorMessage(`Note ${note.content} was already removed from server`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const user = await login({ username, password });
      console.log('user', user);

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setErrorMessage('wrong credentials');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type='submit'>save</button>
    </form>
  );

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>

      <Footer />
    </div>
  );
}
