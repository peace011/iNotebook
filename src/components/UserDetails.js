// // UserDetails.js
// import React, { useContext } from 'react';
// import NoteContext from '../context/notes/NoteContext';

// function UserDetails() {
//   const context = useContext(NoteContext);
//   const { user,setUser } = context;

//   return (
//     <div>
//       <h1>User Details</h1>
//       {user ? (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           {/* Display other user details */}
//         </div>
//       ) : (
//         <p>Loading user details...</p>
//       )}
//     </div>
//   );
// }

// export default UserDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile data using the API endpoint
    const token = localStorage.getItem('token'); // Get the authentication token
    if (token) {
      axios
        .post('http://localhost:5000/api/auth/getuser', null, {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display other user details */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
