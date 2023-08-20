import React, { useState } from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Note before adding:", note); 
        // addNote(note.title, note.description, note.tag);
        addNote(note);
        
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
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">
                            Title
                        </label>
                        <div className="col-sm-5">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={note.title}
                                onChange={onChange}
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
                                id="description"
                                name="description"
                                value={note.description}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="tag" className="col-sm-2 col-form-label">
                            Tag
                        </label>
                        <div className="col-sm-5">
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                name="tag"
                                value={note.tag}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label htmlFor="exampleCheck1" className="form-check-label">
                            Check it on
                        </label>
                    </div>
                    <button disabled={note.title.length<5|| note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
                        Add note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
