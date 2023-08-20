import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import UserDetails from './components/UserDetails';

function App() {
  const[alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <div className="App">
       <NoteState>

<BrowserRouter>
<Navbar/>
<Alert alert={alert}/>
<Routes>
  <Route exact path="/"  element={<Home showAlert={showAlert}/>}/>
  <Route exact path="/about" element={<About />}/>
  <Route path="/notes/:noteId" element={<Notes/>}/>
  <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
  <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
  <Route exact path="/userdetails" element={<UserDetails/>}/>



</Routes>
</BrowserRouter>

</NoteState>
   
    </div>
  );
}

export default App;
