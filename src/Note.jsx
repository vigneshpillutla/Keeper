import React from "react";

function Note(props){
	const {title,content,onClick:deleteNote,id} = props;
	return (
		<div className="note">
			<h1>{title}</h1>
			<p>{content}</p>
			<h5><button value={id} onClick={(e)=>{deleteNote(e);}} className="deleteNote">DELETE</button></h5>
		</div>
	);
}

export default Note;