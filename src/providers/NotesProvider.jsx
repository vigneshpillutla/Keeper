import UserNotes from 'api/notes.js';
import { createContext, useContext, useState } from 'react';
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

    UserNotes.addNote(note);
  };

  const updatedNote = async (id, newNote) => {};
};
