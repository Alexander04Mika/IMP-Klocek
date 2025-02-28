import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Remove login state
    navigate("/login"); // Redirect back to login
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin panel!</p>
      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
