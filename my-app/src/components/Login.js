import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import Header from './Header';
import '../Styles/Login.css';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://us-central1-cart-4dab3.cloudfunctions.net/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    
    if(data)
    {
      console.log(data);
      const history = createBrowserHistory();
      history.push('/Product');
      window.location.reload();
    }
    else{
      alert('Invalid username or password');
    }
    
  };

  return (
    <form onSubmit={handleLogin}>
      <h2><b>Login</b></h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    
  );
}

function Login() {
  return (
    <div>
      <Header/>
      <div className="login-wrapper">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login
