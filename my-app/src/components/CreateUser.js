import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/createProduct.css';
import NavigationBar from './NavigationBar';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CreateUser = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (username && displayName && email) {

      // Create the product object
      const user = {
        username:username,
        email:email,
        password:password,
        displayName:displayName
    };

      // Make the POST API call
      fetch('http://localhost:4002/admins/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => {

          if (response.ok) 
          {
            setMessage('User created successfully!');
            setTimeout(() => {
              history.goBack();
            }, 2000)
            return response.json();
          }
          else 
          {
            setMessage('Some error occurred!');
          }

        })

    } else {
      // Handle form validation error (fields are not filled)
      console.error('Please fill in all fields.');
    }
  };

  return (
    <div>
    <div>
        <Header/>
        <NavigationBar/>
        <br></br>
      <h1><b>Create User</b></h1>
    </div>
    <div className="create-product-page">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        {message && (
          <div className="alert alert-dark" role="alert">
            {message}
          </div>
        )}
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Create</button>
          <br></br>
          <button type="button" onClick={() => history.goBack()}>Go Back</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
