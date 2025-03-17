import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://topgastro.store/api/login.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (data.success) {
        navigate('/update'); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:&nbsp;
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>
            Password:&nbsp;
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
        Přihlásit se
        </button>
      </form>
    </div>
  );
}

export default Login;
