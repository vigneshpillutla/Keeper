import { useNotes } from 'providers/NotesProvider';
import React from 'react';

function Note(props) {
  const { title, content, id, onClick } = props;
  const { deleteNote } = useNotes();

  const handleDelete = () => {
    deleteNote(id);
  };

  return (
    <div id="container" onClick={onClick}>
      <div className="note">
        <h1 id="title">{title}</h1>
        <p id="content">{content}</p>
        <h5>
          <button
            id="delete-button"
            value={id}
            className="deleteNote"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </h5>
      </div>
    </div>
  );
}

export default Note;
