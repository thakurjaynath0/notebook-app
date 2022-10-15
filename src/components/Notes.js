import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {

    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;

    const navigate = useNavigate();
    
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes()
        }else{
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id:"", updateTitle:"", updateDescription:"", updateTag:""});

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, updateTitle: currentNote.title, updateDescription: currentNote.description, updateTag:currentNote.tag});
    }

    const handleSubmit = (e)=>{
        editNote(note.id, note.updateTitle, note.updateDescription, note.updateTag);
        refClose.current.click();
        props.showAlert("Successfully updated", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="updateTitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="updateTitle" name="updateTitle" minLength={3} required value={note.updateTitle} onChange={onChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="updateDescription" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="updateDescription" name="updateDescription" minLength={5} required value={note.updateDescription} onChange={onChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="updateTag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="updateTag" name="updateTag" value={note.updateTag} onChange={onChange}/>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleSubmit} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No notes to dispaly...'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes