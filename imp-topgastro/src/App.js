import React, { useState } from "react";
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kontakty from './components/pages/Kontakty.js';
import About from "./components/pages/About.js";
import Objednavky from './components/pages/Objednavky.js';
import Gastro from './components/pages/Gastro.js';
import Retail from './components/pages/Retail.js';
import FoodManager from "./components/FoodManager.js";
import Footer from "./components/Footer.js";
import Login from "./Login.js";
import AdminDashboard from "./components/pages/AdminDashboard.js";
import UpdateProducts from "./UpdateProducts";
import Sklad from "./components/pages/Sklad.js";
import Recepty from "./components/pages/Recepty.js";
import Katalog from "./components/pages/Katalog.js";
import Zajem from "./components/pages/Zajem.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For FoodManager login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);  // For Admin Login
  const [isAdmin, setAdmin] = useState(false);  // Controls admin access
  
  // FoodManager login handler
  const handleFoodManagerLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/users');
      const users = await response.json();

      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        setIsLoggedIn(true);
        alert('Logged in successfully!');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert("Error connecting to the server.");
      console.error("Error:", error);
    }
  };

  // Admin login handler (called from Footer)
  const handleAdminLogin = (token) => {
    setToken(token); // Store JWT token after login
    setAdmin(true);  // Enable admin mode
  };

  const handleLogout = () => {
    setToken(null);  // Remove JWT token on logout
    setAdmin(false);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Retail' element={<Retail />} />
        <Route path='/Gastro' element={<Gastro isAdmin={isAdmin} />} />

        <Route path='/Gastro/Objednavky' element={<Objednavky />} />
        <Route path='/Gastro/Kontakty' element={<Kontakty />} />
        <Route path='/Gastro/About' element={<About />} />
        <Route path='/Gastro/Sklad' element={<Sklad />} />
        <Route path='/Gastro/Katalog' element={<Katalog />} /> 
        <Route path='/Gastro/Recepty' element={<Recepty />} />
        <Route path='/Gastro/Zajem' element={<Zajem />} />
        
        {/* FoodManager login route */}
        <Route
          path='/food-manager'
          element={
            isLoggedIn ? (
              <FoodManager />
            ) : (
              <div>
                <h1>Food Manager Login</h1>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleFoodManagerLogin}>Sign In</button>
              </div>
            )
          }
        />

{/* muj pokus*/}
<Route path="/login" element={<Login />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/update" element={<UpdateProducts />} />

      </Routes>

    </Router>
  );
}

export default App;
