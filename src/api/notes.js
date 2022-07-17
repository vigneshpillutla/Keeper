import config from 'config/keys';
import { callGet, callPost, callPatch, callDelete } from 'utils/requests';

const { serverDomain } = config;
const notesDomain = `${serverDomain}/api/notes`;

const getNotes = async () => callGet(notesDomain);

const addNote = async (note) => callPost(notesDomain, note);

const updateNote = async (id, newNote) =>
  callPatch(`${notesDomain}/${id}`, newNote);

const deleteNote = async (id) => callDelete(`${notesDomain}/${id}`);

export default { getNotes, addNote, updateNote, deleteNote };
