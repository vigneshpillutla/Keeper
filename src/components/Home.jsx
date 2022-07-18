import Header from 'components/Header';
import EditableNote from 'components/EditableNote';
import Note from 'components/Note';
import { useAuth } from 'providers/AuthProvider';
import { useNotes } from 'providers/NotesProvider';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import NewNote from './NewNote';
import { FullScreenLoader } from './Loading/Loading';

const Home = () => {
  const auth = useAuth();
  const {
    sessionData: { loading, isLoggedIn }
  } = auth;

  const [editableNote, setEditableNote] = useState({
    show: false,
    id: ''
  });

  const { notes, getNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, []);

  const handleNoteClick = (id) => {
    setEditableNote({ show: true, id });
  };

  const hideEditableNote = () => {
    setEditableNote({ show: false, id: '' });
  };

  if (!loading && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header />
      <NewNote />
      {notes.map((note) => (
        <Note
          key={note.id}
          {...note}
          onClick={() => handleNoteClick(note.id)}
        />
      ))}
      <EditableNote {...editableNote} onBackgroundClick={hideEditableNote} />
      <FullScreenLoader dots={4} loading={loading} />
    </div>
  );
};

export default Home;
