import { useNotes } from 'providers/NotesProvider';
import React, { useState, useEffect, useRef } from 'react';
function NewNote() {
  const [note, setNote] = useState({
    title: '',
    content: ''
  });
  const { addNote } = useNotes();
  const [newNoteClass, setNewNoteClass] = useState('hidden-content');
  const newNoteRef = useRef();
  function handleDocumentClick(event) {
    let clickedComponent = event.target;
    let targetDiv = newNoteRef.current;
    const noteClass = targetDiv?.contains(clickedComponent)
      ? ''
      : 'hidden-content';

    setNewNoteClass(noteClass);
  }
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  function updateFormState(event) {
    let { value: newValue, name: elementName } = event.target;
    setNote((prevValue) => ({ ...prevValue, [elementName]: newValue }));
  }
  function handleFormSubmit(event) {
    addNote(note);
    setNote({
      title: '',
      content: ''
    });
    setNewNoteClass('hidden-content');
    event.preventDefault();
  }
  return (
    <form
      method="POST"
      autoComplete="off"
      onSubmit={handleFormSubmit}
      className="new-note-form"
    >
      <div ref={newNoteRef}>
        <input
          className="noteTitle"
          onChange={updateFormState}
          autoComplete="off"
          name="title"
          type="search"
          placeholder="Title"
          value={note.title}
        ></input>
        <div className={newNoteClass}>
          <textarea
            className="newNoteTextArea txtArea"
            onChange={updateFormState}
            name="content"
            id=""
            cols="40"
            rows="4"
            placeholder="Write a note..."
            value={note.content}
          ></textarea>
          <button className="addIcon" type="submit">
            +
          </button>
        </div>
      </div>
    </form>
  );
}

export default NewNote;
