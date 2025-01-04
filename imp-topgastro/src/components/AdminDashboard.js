import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function passed down from App.js
    navigate('/admin'); // Redirect back to login
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome to the Admin Dashboard</h2>
      <p>This is where you can manage the site content.</p>

      {/* Add a logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
