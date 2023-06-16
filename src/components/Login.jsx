import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./Login.css";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/Profile" />;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
      <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
