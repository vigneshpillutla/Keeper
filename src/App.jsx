import React,{useState,useReducer,useEffect} from "react";

import Header from "./Header";
import Note from "./Note";
import NewNote from "./NewNote";
import EditableNote from "./EditableNote";
import Login from "./Login";
import SignUp from "./SignUp";
import {BrowserRouter as Router,Redirect,Route} from "react-router-dom";
let current;
const ACTIONS = {
    getNotes:'getNotes',
    addNote:'addNote',
    deleteNote:'deleteNote',
    saveNote:'saveNote',
    updateState:'updateState',
}
async function addModifyNoteDB(email,newNote,action){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    urlencoded.append("email",email);
    urlencoded.append("newNote[key]",newNote.key);
    urlencoded.append("newNote[title]",newNote.title);
    urlencoded.append("newNote[content]",newNote.content);
    let options = {
      method: action,
      headers: myHeaders,
      body: urlencoded,
    }
    return fetch("http://localhost:9000/user", options)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
    
  }
  async function getNoteDB(email){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded");
    let options = {
      method: 'GET',
      headers: myHeaders,
    }
    return fetch("http://localhost:9000/user?email="+email, options)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
  }
  async function deleteNoteDB(email,key){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type","application/x-www-form-urlencoded");
    let options = {
      method: 'DELETE',
      headers: myHeaders,
    }
    return fetch(`http://localhost:9000/user?email=${email}&key=${key}`, options)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
  }
function reducer(notes,data){
    let updatedNotes=[...notes];
    const action =data.action;
    const email = data.email;
    if(action===ACTIONS.getNotes){
        return data.userNotes;
    }
    else if(action===ACTIONS.deleteNote){
        deleteNoteDB(email,data.key);
        return updatedNotes.filter(elem=>elem.key!==data.key);
    }
    else{
        const{key,title,content} = data	;
        if(action===ACTIONS.addNote){
                const newNote = {
                    key:key,
                    title:title,
                    content:content
                }
                updatedNotes.push(newNote);
                addModifyNoteDB(email,newNote,'PUT');
        }
        else if(action===ACTIONS.saveNote){
            let pos = updatedNotes.map(elem=>{return elem.key}).indexOf(key)
            const newNote = {
                key:key,
                title:title,
                content:content
            }
            updatedNotes[pos]=newNote
            addModifyNoteDB(email,newNote,'PATCH');


        }
    }
    return updatedNotes;
}
function App(){
    const [notes,setNotes] = useReducer(reducer,[]);
    const [editableNoteInfo,setEditableNoteInfo] = useState({
        hideEditableNote:true,
        title:"",
        content:"",
        id:"",
    });
    const [user,setUser] = useState({
        loggedIn:false,
        email:""
    });
    useEffect(()=>{
        if(user.loggedIn===true){
            const get = async()=>{
                const storedNotes = await getNoteDB(user.email)
                setNotes({
                    action:ACTIONS.getNotes,
                    userNotes:storedNotes
                })
            }
            get();
        }
    },[user]);
    useEffect(()=>{
        current=notes
        console.log(current);
    },[notes]);
    function addNotes(noteData){
        const {noteTitle:title,noteContent:content} = noteData;
        if(title!==""||content!==""){
            const key = Date.now();
            console.log(key);
            setNotes({
                email:user.email,
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
            email:user.email
        }
        setNotes(test)
    }
    function deleteNote(key){
        setNotes({
            action:ACTIONS.deleteNote,
            key:key,
            email:user.email
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
            console.log(current);
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
                <Route path="/" exact><Redirect to="/login"/></Route>
                <Route path="/login" exact render={(props)=><Login {...props} setUser={setUser}/>}/>
                <Route path="/register" render={(props)=><SignUp {...props} setUser={setUser}/>}/>
            </div>
            </Router>
        );
    }
    else{
        
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
}

export default App;