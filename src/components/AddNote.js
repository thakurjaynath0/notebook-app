import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [notes, setNotes] = useState({title:"", description:"", tag:""})

    const handleSubmit = (e)=> {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.tag);
        props.showAlert("Successfully added a note", "success");
        setNotes({title:"", description:"", tag:""})
    }

    const onChange = (e)=> {
        setNotes({...notes, [e.target.name]: e.target.value});
    }

  return (
    <div>
      <div className="container my-3">
                <h2>Add a Note.</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={notes.title} minLength={3} required onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={notes.description} minLength={5} required onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={notes.tag} onChange={onChange}/>
                    </div>
                    <button disabled={notes.title.length<3 || notes.description.length<5} type="submit" className="btn btn-dark" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
    </div>
  )
}

export default AddNote
