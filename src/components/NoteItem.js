import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const NoteItem = (props) => {
  const context=useContext(NoteContext);
  const {deleteNote}=context;   //context delete
   const {note,updateNote}=props;   //passed map note
  return (
    <div className='row mb-3 '> 

<div className="col">

<div className="card" style={{width: "18rem"}}>
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title"> {note.title}</h5>
    <i className="fa-regular fa-trash-can mx-2" onClick={()=>(deleteNote(note._id))}></i>
    <Link to={'/notes/'+note._id}>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>(updateNote(note))}></i>
    </Link>
    </div>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>

  
  </div>
</div>
</div>
    </div>
  )
}

export default NoteItem