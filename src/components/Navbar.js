import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
   
    let location=useLocation();

    useEffect(()=>{
        console.log(location.pathname);
    },[location]);

    const navigate=useNavigate();

    const logout=()=>{
        localStorage.clear();
        console.log("logout");
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
                            </li>

                        </ul>

{(!localStorage.getItem('token'))?
                        <form className="d-flex">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>

                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form>
                        :
                        <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          Logout
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><Link className="dropdown-item" to='/userdetails'>Profile</Link></li>
                          <li><a className="dropdown-item" href="#">Settings</a></li>
                          <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                        </ul>
                      </div>
                        
                    //  <button className="btn btn-secondary" onClick={logout}>Logout</button>
                }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar