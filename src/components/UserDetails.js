import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user,setUser]=useState("")


  const[credential,setCredential]=useState({email:"",password:""})
      
      const handleSubmit=(e)=>{
          e.preventDefault();
          axios.post('http://localhost:5000/api/auth/getuser',credential
          , {
              headers: {               
                  'auth-token': localStorage.getItem('token')             
          }})
              .then(resp => {
                  console.log(resp.data);
                  setUser(resp.data);
                }  )       
              .catch(error => {
                  console.error(error);
              })  
        } ;

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredential((prevNote) => ({
        ...prevNote,
        [name]: value,
    }));
};

  return (
    <div>

<div>
        <form onSubmit={handleSubmit}> 
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}
    value={credential.email} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange}
    value={credential.passowrd} />
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>

      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Id: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display other user details */}
        </div>
      ) : (
        <p>Loading user profile ok...</p>
      )}
    </div>
  );
}

export default UserProfile;
