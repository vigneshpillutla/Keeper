import React,{useState,useEffect,useRef} from "react";
function NewNote(props){
	const [formState,setFormState] =useState({
		noteTitle :"",
		noteContent :"",
	}); 
	const [newNoteClass,setNewNoteClass] = useState("hidden-content")
	const newNoteRef = useRef();
	function handleDocumentClick(event){
		let clickedComponent = event.target
		let targetDiv=newNoteRef.current
		if(targetDiv.contains(clickedComponent)){
			setNewNoteClass("")
		}
		else{
			setNewNoteClass("hidden-content")
		}
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
				return {
					noteTitle:newValue,
					noteContent:prevValue.noteContent
				};
			}
			else{
				return {
					noteTitle:prevValue.noteTitle,
					noteContent:newValue
				};
			}
		});
	}
	function handleFormSubmit(event){
		const {noteTitle:title,noteContent:content}=formState;
		props.onClick(title,content);
		setFormState({
		noteTitle :"",
		noteContent :"",
		});
		setNewNoteClass("hidden-content");
		event.preventDefault();
	}
	return (
		<form method="POST" autoComplete="off" onSubmit={handleFormSubmit}>
		    <div ref={newNoteRef}>
				<input className="noteTitle" onChange={updateFormState} autoComplete="off"  name="title" type="search" placeholder="Title" value={formState.noteTitle}></input>
				<div className={newNoteClass}>
					<textarea className="newNoteTextArea" onChange={updateFormState} name="content" id="" cols="40" rows="2" placeholder="Write a note..." value={formState.noteContent}></textarea>
					<button className="addIcon" type="submit">+</button>
				</div>
			</div>
		</form>
	);
}

export default NewNote;