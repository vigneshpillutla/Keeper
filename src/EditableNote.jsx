import React,{useState,useEffect} from "react";

function EditableNote(props){
    const {allInfo,onBackgroundClick,onSave:saveNote} = props
    const {hideEditableNote,title,content,key} = allInfo
    const [noteData,setNoteData] = useState({
        title:"",
        content:"",
        key:""
    });
    useEffect(()=>{
        setNoteData({
            title:title,
            content:content,
            key:key,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[key])
    function handleChange(event){
        let {value:newValue,name:elementName} = event.target;
        setNoteData((prevValue)=>{
            if(elementName==="title"){
                return {
                    title:newValue,
                    content:prevValue.content,
                    key:key
                };
            }
            else{
                return {
                    title:prevValue.title,
                    content:newValue,
                    key:key
                };
            }
        });
    }
    function handleFormSubmit(event) {
        saveNote(noteData)
        onBackgroundClick(-1,true);
        event.preventDefault()
    }
    return (
        <div className={hideEditableNote?"hidden-content":""}>
            <div className="editable-card-background" onClick={()=>{onBackgroundClick(-1,true);}}></div>
            <form onSubmit={handleFormSubmit} className="editableForm" method="POST" autoComplete="off">
                <input onChange={handleChange} name="title" className="editableTitle" type="text" placeholder="Title" value={noteData.title}/>
                <textarea onChange={handleChange} className="editableContent" name="content"  value={noteData.content}></textarea>
                <button className="save" type="submit"><h5>SAVE</h5></button>
                <button className="close" onClick={()=>{onBackgroundClick(-1,true);}} type="button"><h5>CLOSE</h5></button>
            </form>
        </div>
    );
}

export default EditableNote;