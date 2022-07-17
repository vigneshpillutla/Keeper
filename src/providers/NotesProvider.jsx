import UserNotes from 'api/notes.js';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await UserNotes.getNotes();
    const res = await response.json();
    if (response.ok) {
      setNotes(res.data);
      return;
    }

    toast.error('Could not fetch notes!');
  };

  const addNote = async (note) => {
    notes.push(note);

    return UserNotes.addNote(note);
  };

  const updatedNote = async (id, newNote) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          return { ...note, ...newNote };
        }
        return note;
      })
    );

    return UserNotes.updateNote(id, newNote);
  };

  const deleteNote = async (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));

    return UserNotes.deleteNote(id);
  };

  const value = {
    getNotes,
    addNote,
    updatedNote,
    deleteNote
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
