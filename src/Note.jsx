import React,{useRef,useEffect} from "react";

function Note(props){
	const {title,content,onClick:deleteNote,id,onNoteClick:handleNoteClick} = props;
	const noteRef = useRef();
	useEffect(()=>{
		document.addEventListener('click',handleDocumentClick)
		return ()=>{
			document.removeEventListener('click',handleDocumentClick)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	function handleDocumentClick(event){
		if(event.target.className!=="deleteNote"&&noteRef.current.contains(event.target)){
			handleNoteClick(id,false);
		}
	}
	return (
		<div id="container">
			<div className="note" ref={noteRef}>
				<h1 id="title">{title}</h1>
				<p id="content">{content}</p>
				<h5><button id="delete-button" value={id} onClick={()=>{deleteNote(id);}} className="deleteNote">DELETE</button></h5>
			</div>
		</div>
	);
}

export default Note;