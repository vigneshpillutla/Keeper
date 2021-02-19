import React,{useState} from "react";

import Header from "./Header";
import Note from "./Note";
import NewNote from "./NewNote";
import testNotes from "./notes";
function App(){
	const [notes,setNotes] = useState([...testNotes]);
	function addNotes(title,content){
		if(title!==""||content!==""){
			let updatedNotes=[...notes];
			const date=new Date();
			const key = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			
			updatedNotes.push({
				key:key,
				title:title,
				content:content
			});
			console.log(updatedNotes.toString());
			setNotes(updatedNotes);
		}

	}
	function deleteNote(event){
		const key = event.target.value;
		console.log(key);
		const updatedNotes = notes.filter((elem)=>{
			return elem.key!==key;
		});
		setNotes(updatedNotes);
	}
	return (
		<div>
		<Header/>
		<NewNote  onClick={(title,content)=>{addNotes(title,content)}}/>
		{notes.map(newNote => <Note 
			key={newNote.key}
			title={newNote.title}
			content={newNote.content}
			id={newNote.key}
			onClick={deleteNote}
			/>
		)}
		</div>
	);
}

export default App;