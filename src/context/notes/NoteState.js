import React, { useState } from "react";
import NoteContext from "./NoteContext";
import axios from "axios";

const NoteState =(props)=>{
    
    const getNotes = () => {
       
    
        axios.get(`http://localhost:5000/api/notes/fetchallnotes`, {
            headers: {
                
                // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNzRmMDJlZDM5ZWIzNzc4NzkwODJlIn0sImlhdCI6MTY5MTgzMjA2Nn0.vS_dM4PW8oPXBybens3qLMsssPH5VKNniG_RPYFjHGQ"
                'auth-token': localStorage.getItem('token')

            }
        })
            .then(resp => {
                console.log(resp.data);
                setNotes(resp.data);
              
            })
            .catch(error => {
                console.error(error);
            });
    
        console.log("fetching a new note");
    };

    const[notes,setNotes]=useState([]);
   
  
    const addNote = (note) => {
        // const newNote = {
        //     "title": title,
        //     "description": description,
        //     "tag": tag
        // };
    
        axios.post(`http://localhost:5000/api/notes/addnote`, note,{
            headers: {
                
                 'auth-token': localStorage.getItem('token')
            }
        })
            .then(resp => {
                console.log(resp.data);
                setNotes([...notes, resp.data]); // Add the new note to the current notes
            })
            .catch(error => {
                console.error(error);
            });
    
        // console.log("adding a new note",newNote);
    };
   
    

     //Delete Note
     const deleteNote=(_id)=>{
        axios.delete(`http://localhost:5000/api/notes/deletenote/${_id}`,{
            headers: {
                
                 'auth-token': localStorage.getItem('token')
            }
        })
            .then(resp => {
                console.log(resp.data);
                // setNotes([...notes, resp.data]); // Add the new note to the current notes
                getNotes();
            })
            .catch(error => {
                console.error(error);
            });
        console.log("deleting note" +_id);
      
     }

      //Edit Note
    const editNote=(note)=>{
        //API call
        axios.put(`http://localhost:5000/api/notes/updatenote/${note.eid}`,
        {
            // _id: id,
            title: note.etitle,
            description: note.edescription,
            tag: note.etag
          },
          {
            headers: {
                
                'auth-token': localStorage.getItem('token')
            }
        })
            .then(resp => {
                console.log(resp.data);
                setNotes([...notes, resp.data]); // Add the new note to the current notes
                getNotes();
            })
            .catch(error => {
                console.error(error);
            });
        console.log("updating note" );

                }

                const [user, setUser] = useState(null);
                const fetchUserDetails = async (token) => {
                    try {
                      const response = await axios.post('http://localhost:5000/api/auth/getuser', null, {
                        headers: {
                          'Content-Type': 'application/json',
                          'auth-token': localStorage.getItem('token'),
                        },
                      });
                
                      setUser(response.data);
                      console.log("ok");
                    } catch (error) {
                      console.error(error);
                    }
                  };
                
        


    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes,fetchUserDetails,user}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;