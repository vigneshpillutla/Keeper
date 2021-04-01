import React,{useState,useReducer,useEffect} from "react";

import Header from "./Header";
import Note from "./Note";
import NewNote from "./NewNote";
import testNotes from "./notes";
import EditableNote from "./EditableNote";
import Login from "./Login";
import SignUp from "./SignUp";
import {BrowserRouter as Router,Route} from "react-router-dom";
let current;
const ACTIONS = {
    addNote:'addNote',
    deleteNote:'deleteNote',
    saveNote:'saveNote',
    updateState:'updateState',
}
function reducer(notes,data){
    let updatedNotes=[...notes];
    const action =data.action;
    if(action===ACTIONS.deleteNote){
        return updatedNotes.filter(elem=>elem.key!==data.key);
    }
    const{key,title,content} = data	;
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
    return updatedNotes;
}
function App(){
    const [notes,setNotes] = useReducer(reducer,[...testNotes]);
    const [editableNoteInfo,setEditableNoteInfo] = useState({
        hideEditableNote:true,
        title:"",
        content:"",
        id:"",
    });
    const [user,setUser] = useState({
        loggedIn:false,
        username:""
    });
    useEffect(()=>{
        current=notes
    },[notes]);
    function addNotes(noteData){
        const {noteTitle:title,noteContent:content} = noteData;
        if(title!==""||content!==""){
            const key = Date.now();
            console.log(key);
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
    if(!user.loggedIn){
        return( 
            <Router>
            <div>
                <Header/>    
                <Route path="/" exact render={(props)=><Login {...props} setUser={setUser}/>}/>
                <Route path="/signup" render={(props)=><SignUp {...props} setUser={setUser}/>}/>
            </div>
            </Router>
        );
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