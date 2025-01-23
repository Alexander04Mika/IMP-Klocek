import React, { useState } from "react";
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kontakty from './components/pages/Kontakty.js';
import Katalog from "./components/pages/katalog.js";
import Objednavky from './components/pages/Objednavky.js';
import Gastro from './components/pages/Gastro.js';
import Retail from './components/pages/Retail.js';
import AdminDashboard from "./components/AdminDashboard.js";
import AdminLogin from "./components/AdminLogin.js";
import FoodManager from "./components/FoodManager.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For FoodManager login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Retail' element={<Retail />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/Gastro' element={<Gastro />} />
        <Route path='/Gastro/Objednavky' element={<Objednavky />} />
        <Route path='/Gastro/Kontakty' element={<Kontakty />} />
        <Route path='/Gastro/Katalog' element={<Katalog />} />
        
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
      </Routes>
    </Router>
  );
}

export default App;
