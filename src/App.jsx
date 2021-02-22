import React,{useState,useReducer,useEffect} from "react";

import Header from "./Header";
import Note from "./Note";
import NewNote from "./NewNote";
import testNotes from "./notes";
import EditableNote from "./EditableNote"
let current;
const ACTIONS = {
	addNote:'addNote',
	deleteNote:'deleteNote',
	saveNote:'saveNote',
	updateState:'updateState',
}
function reducer(notes,data){
	let updatedNotes=[...notes]
	const action =data.action
	if(action===ACTIONS.deleteNote){
		return updatedNotes.filter(elem=>elem.key!==data.key)
	}
	const{key,title,content} = data	
	if(action===ACTIONS.addNote){
			updatedNotes.push({
				key:key,
				title:title,
				content:content
			});
	}
	else if(action===ACTIONS.saveNote){
		let pos = updatedNotes.map(elem=>{return elem.key}).indexOf(key)
		updatedNotes[pos]={
			key:key,
			title:title,
			content:content,
		}

	}
	// current = updatedNotes
	return updatedNotes
}
function App(){
	const [notes,setNotes] = useReducer(reducer,[...testNotes]);
	const [editableNoteInfo,setEditableNoteInfo] = useState({
		hideEditableNote:true,
		title:"",
		content:"",
		id:"",
	});
	useEffect(()=>{
		current=notes
	},[notes])
	function addNotes(title,content){
		if(title!==""||content!==""){
			const date=new Date();
			const key = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			setNotes({
				action:ACTIONS.addNote,
				key:key,
				title:title,
				content:content
			})
		}
	}
	function saveNote(noteData){
		let test={
			...noteData,
			action:ACTIONS.saveNote,
		}
		setNotes(test)
	}
	function deleteNote(key){
		setNotes({
			action:ACTIONS.deleteNote,
			key:key,
		});
	}
	function handleNoteClick(key,hide){
		if(hide){
			setEditableNoteInfo({
				hideEditableNote:hide,
				title:"",
				content:"",
				id:"",
			})
		}
		else{
			let {title,content} = current.filter(item => item.key===key)[0]
			
			setEditableNoteInfo({
				hideEditableNote:hide,
				title:title,
				content:content,
				key:key,
			})
		}
		
	}
	return (
		<div>
		<Header/>
		<NewNote  onClick={addNotes}/>
		{notes.map(newNote => 
			<Note 
			id = {newNote.key}
			key={newNote.key}
			title={newNote.title}
			content={newNote.content}
			onClick={deleteNote}
			onNoteClick={handleNoteClick}
			/>
		)}
		<EditableNote allInfo={editableNoteInfo} onBackgroundClick={handleNoteClick} onSave={saveNote}/>
		</div>
	);
}

export default App;