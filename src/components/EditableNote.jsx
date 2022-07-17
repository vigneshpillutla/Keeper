import { useNotes } from 'providers/NotesProvider';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function EditableNote(props) {
  const { id, onBackgroundClick, show } = props;
  const [note, setNote] = useState(null);
  const { notes, updateNote } = useNotes();

  useEffect(() => {
    setNote(notes.find((current) => current.id === id));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const dataToUpdate = _.pick(note, ['title', 'content']);
    updateNote(id, dataToUpdate);
    onBackgroundClick();
  };

  if (!note) return null;
  return (
    <div className={!show ? 'hidden-content' : ''}>
      <div
        className="editable-card-background"
        onClick={() => {
          onBackgroundClick();
        }}
      ></div>
      <form
        onSubmit={handleFormSubmit}
        className="editableForm"
        method="POST"
        autoComplete="off"
      >
        <input
          onChange={handleChange}
          name="title"
          className="editableTitle"
          type="text"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          className="editableContent"
          name="content"
          value={note.content}
        ></textarea>
        <button className="save" type="submit">
          <h5>SAVE</h5>
        </button>
        <button
          className="close"
          onClick={() => {
            onBackgroundClick();
          }}
          type="button"
        >
          <h5>CLOSE</h5>
        </button>
      </form>
    </div>
  );
}

export default EditableNote;
