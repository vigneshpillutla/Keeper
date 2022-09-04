import UserNotes from 'api/notes.js';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthProvider';

const NotesContext = createContext();

const useNotes = () => useContext(NotesContext);

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { modifySessionData } = useAuth();
  const getNotes = async () => {
    const response = await UserNotes.getNotes();
    const res = await response.json();
    if (response.ok) {
      setNotes(res.data);
      return;
    }
  };

  const addNote = async (note) => {
    modifySessionData({ loading: true });
    const response = await UserNotes.addNote(note);
    const res = await response.json();
    modifySessionData({ loading: false });
    if (response.ok) {
      setNotes((prev) => {
        const updatedNotes = [...prev];
        updatedNotes.push(res.data);
        return updatedNotes;
      });
    }
  };

  const updateNote = async (id, newNote) => {
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
    notes,
    getNotes,
    addNote,
    updateNote,
    deleteNote
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export { useNotes };

export default NotesProvider;
