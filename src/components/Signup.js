import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {

    const[credential,setCredential]=useState({name:"",email:"",password:"",confirmpassword:""})
   
    const navigate=useNavigate();
        
        const handleSubmit=(e)=>{
            e.preventDefault();
            axios.post('http://localhost:5000/api/auth/createuser',credential)
            // , {
            //     headers: {
                    
            //         'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNzRmMDJlZDM5ZWIzNzc4NzkwODJlIn0sImlhdCI6MTY5MTgzMjA2Nn0.vS_dM4PW8oPXBybens3qLMsssPH5VKNniG_RPYFjHGQ"
            //     }
            // }
                .then(resp => {
                    console.log(resp.data);
                  if(resp.data.authtoken){
                    localStorage.setItem('token',resp.data.authtoken);
                    navigate('/login');
                    props.showAlert("Account Created Successfully ","success");

                  }else{
                    props.showAlert("invalid Credential","danger");
                  }
                })
                .catch(error => {
                    console.error(error);
                });
        
            console.log("Register");
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
    <div className='container'>
        <form onSubmit={handleSubmit}> 
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange}
    value={credential.name} />
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}
    value={credential.email} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange}
    value={credential.password} />
  </div>
  <div className="mb-3">
    <label htmlFor="confirmpassword" className="form-label">Password</label>
    <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' onChange={onChange}
    value={credential.confirmpassword} />
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup