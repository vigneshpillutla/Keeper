import React, { useState, useEffect } from 'react';

import Header from './Header';
import Note from './Note';
import NewNote from './NewNote';
import EditableNote from './EditableNote';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

let currentNotes = [];
function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    notes: [],
    loggedIn: false
  });
  const [editableNoteInfo, setEditableNoteInfo] = useState({
    hideEditableNote: true,
    title: '',
    content: '',
    id: ''
  });
  useEffect(() => {
    fetch('https://keep-er-api.herokuapp.com/loginStatus', {
      credentials: 'include',
      method: 'GET',
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.loggedIn) {
          setUser({ ...response.user, loggedIn: true });
        }
      });
  }, []);
  useEffect(() => {
    currentNotes = [...notes];
  }, [notes]);
  useEffect(() => {
    if (user.loggedIn) {
      setNotes(user.notes);
    }
  }, [user]);
  function addNotes(noteData) {
    const { noteTitle: title, noteContent: content } = noteData;
    if (title !== '' || content !== '') {
      const updatedNotes = [...notes];
      const newNote = {
        key: Date.now(),
        title: title,
        content: content
      };
      updatedNotes.push(newNote);
      setNotes(updatedNotes);
      fetch('https://keep-er-api.herokuapp.com/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          newNote
        }),
        credentials: 'include',
        mode: 'cors'
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log('Oops! something went wrong'));
    }
  }
  function saveNote(noteData) {
    const updatedNotes = [...notes];
    let pos = notes.map((elem) => elem.key).indexOf(noteData.key);
    updatedNotes[pos] = noteData;
    setNotes(updatedNotes);
    fetch('https://keep-er-api.herokuapp.com/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        noteData
      }),
      credentials: 'include',
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  function deleteNote(key) {
    const email = user.email;
    const updatedNotes = notes.filter((elem) => elem.key !== key);
    setNotes(updatedNotes);
    fetch(`https://keep-er-api.herokuapp.com/user/${email}/${key}`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  function handleNoteClick(key, hide) {
    if (hide) {
      setEditableNoteInfo({
        hideEditableNote: hide,
        title: '',
        content: '',
        id: ''
      });
    } else {
      let { title, content } = currentNotes.filter(
        (item) => item.key === key
      )[0];

      setEditableNoteInfo({
        hideEditableNote: hide,
        title: title,
        content: content,
        key: key
      });
    }
  }
  const Home = () => {
    return (
      <div>
        <Header user={user} setUser={setUser} />
        <NewNote onClick={addNotes} />
        {notes.map((newNote) => (
          <Note
            id={newNote.key}
            key={newNote.key}
            title={newNote.title}
            content={newNote.content}
            onClick={deleteNote}
            onNoteClick={handleNoteClick}
          />
        ))}
        <EditableNote
          allInfo={editableNoteInfo}
          onBackgroundClick={handleNoteClick}
          onSave={saveNote}
        />
      </div>
    );
  };
  return (
    <Router>
      <Route path="/" exact>
        {user.loggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route
        path="/login"
        exact
        render={(props) => <Login {...props} user={user} setUser={setUser} />}
      />
      <Route
        path="/signup"
        exact
        render={(props) => <SignUp {...props} setUser={setUser} />}
      />
    </Router>
  );
}

export default App;
