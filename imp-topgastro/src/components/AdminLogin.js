import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple login logic (replace with real validation if needed)
    if (email === 'admin@example.com' && password === 'password') {
      login(); // Call login function passed down from App.js
      navigate('/admin/dashboard'); // Redirect to dashboard
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
