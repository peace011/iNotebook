import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes,addNote,setNotes ,editNote} = context;

  const {noteId}=useParams();
  const navigate=useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
  }
  else{
    navigate('/login');
  }
  }, []);


  const ref = useRef(null);
  const refClose = useRef(null);



  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,eid:currentNote._id});

   
  }

  

  const [note, setNote] = useState({ eid:"",etitle: '', edescription: '', etag: 'default' });

  const handleClick = (e) => {
      e.preventDefault();
    refClose.current.click();
    console.log(note.eid,note.etitle,note.edescription,note.etag);
  editNote(note);
    // editNote(note.eid,note.etitle,note.edescription,note.etag);
  };
  

  const onChange = (e) => {
      const { name, value } = e.target;
      setNote((prevNote) => ({
          ...prevNote,
          [name]: value,
      }));
  };


  return (
    <div>
      <AddNote />


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
              <form>
                <div className="mb-3 row">
                  <label htmlFor="title" className="col-sm-2 col-form-label">
                    Title
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      minLength={5}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="description" className="col-sm-2 col-form-label">
                    Description
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      minLength={5}
                      onChange={onChange}
                      required
                    />
                  </div>
                  
                </div>

                <div className="mb-3 row">
                  <label htmlFor="description" className="col-sm-2 col-form-label">
                    Tag
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      minLength={5}
                      onChange={onChange}
                      required
                    />
                  </div>
                  
                </div>
                </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5|| note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">

        <h2>Your Notes</h2>
        <div className="row">
          {notes.length===0 &&'No notes to dispaly'}
          {
            notes.map((note) => {

              return <div key={note._id} className='col md-4'>
                <NoteItem note={note} updateNote={updateNote} />
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Notes