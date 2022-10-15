import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {

    const host = "http://localhost:5000"

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);


    //Get All Note
    const getAllNotes = async ()=> {

        const response = await fetch(`${host}/api/notes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }          
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a Note
    const addNote = async (title, description, tag)=> {

        const response = await fetch(`${host}/api/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) 
          });
        const json = await response.json();
        const note = json;
        setNotes(notes.concat(note));
    }

    //Edit a Note
    const editNote = async (id, title, description, tag)=> {

        await fetch(`${host}/api/notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) 
          });

        const newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            
            if(element._id === id){
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNote)
    }

    //Delete a Note
    const deleteNote = async (id)=> {
        await fetch(`${host}/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }          
        });
        const newNote = notes.filter((note)=> {return note._id !== id});
        setNotes(newNote);
    }

    return(
        <NoteContext.Provider value={{notes, getAllNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState