import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const[credential,setCredential]=useState({email:"",password:""})
   
const navigate=useNavigate();
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login',credential)
        // , {
        //     headers: {
                
        //         'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNzRmMDJlZDM5ZWIzNzc4NzkwODJlIn0sImlhdCI6MTY5MTgzMjA2Nn0.vS_dM4PW8oPXBybens3qLMsssPH5VKNniG_RPYFjHGQ"
        //     }
        // }
            .then(resp => {
                console.log(resp.data);
              if(resp.data.success){
                localStorage.setItem('token',resp.data.authtoken);
                navigate('/');
                props.showAlert("Login Successfully ","success");

              }else{
                props.showAlert("invalid Credential","danger");
              }
            })
            .catch(error => {
                console.error(error);
            });
    
        console.log("Login");
    };


    
    const onChange = (e) => {
        const { name, value } = e.target;
        setCredential((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

  return (
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
  )
}

export default Login