import React,{useState,useEffect,useRef} from "react";
function NewNote(props){
	const [formState,setFormState] = useState({
		noteTitle :"",
		noteContent :"",
	}); 
	const [newNoteClass,setNewNoteClass] = useState("hidden-content")
	const newNoteRef = useRef();
	function handleDocumentClick(event){
		let clickedComponent = event.target
		let targetDiv=newNoteRef.current
		const noteClass = targetDiv?.contains(clickedComponent) ? "": "hidden-content";

		setNewNoteClass(noteClass);
	}
	useEffect(()=>{
		document.addEventListener('click',handleDocumentClick)

		return ()=>{
			document.removeEventListener('click',handleDocumentClick)
		}
	},[])
	function updateFormState(event){
		let {value:newValue,name:elementName} = event.target;
		setFormState((prevValue)=>{
			if(elementName==="title"){
				return {...prevValue, noteTitle:newValue};
			}
			else{
				return {...prevValue, noteContent:newValue};
			}
		});
	}
	function handleFormSubmit(event){
		console.log(formState);
		props.onClick(formState);
		setFormState({
		noteTitle :"",
		noteContent :"",
		});
		setNewNoteClass("hidden-content");
		event.preventDefault();
	}
	return (
		<form method="POST" autoComplete="off" onSubmit={handleFormSubmit} className="new-note-form">
		    <div ref={newNoteRef}>
				<input className="noteTitle" onChange={updateFormState} autoComplete="off"  name="title" type="search" placeholder="Title" value={formState.noteTitle}></input>
				<div className={newNoteClass}>
					<textarea className="newNoteTextArea txtArea" onChange={updateFormState} name="content" id="" cols="40" rows="2" placeholder="Write a note..." value={formState.noteContent}></textarea>
					<button className="addIcon" type="submit">+</button>
				</div>
			</div>
		</form>
	);
}

export default NewNote;