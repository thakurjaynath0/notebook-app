import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
   const {note, updateNote} = props;

   const context = useContext(NoteContext);
   const {deleteNote} = context;

  return (
    <div className='col-md-3'>
          <div className="card my-3">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
            <span className="badge bg-dark">{note.tag}</span>
          </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mr-auto">
                    <h5 className="card-title">{note.title}</h5>
                      <i className="fa-solid fa-trash mx-2" onClick={()=>{
                        deleteNote(note._id);
                        props.showAlert("Successfully deleted", "success");
                        }}></i>
                      <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                      <p className="card-text">{note.description}</p>
                  </div>
          </div>
    </div>
  )
}

export default Noteitem
