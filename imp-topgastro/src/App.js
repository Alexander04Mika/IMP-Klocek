

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/pages/Home";
import Kontakty from "./components/pages/Kontakty";
import About from "./components/pages/About";
import Objednavky from "./components/pages/Objednavky";
import Gastro from "./components/pages/Gastro";
import Retail from "./components/pages/Retail";
import Login from "./Login";
import AdminDashboard from "./components/pages/AdminDashboard";
import UpdateProducts from "./UpdateProducts";
import Sklad from "./components/pages/Sklad";
import Historie from "./components/pages/Historie";
import Recepty from "./components/pages/Recepty";
import Zajem from "./components/pages/Zajem";
import CookieConsent from "./components/CookieConsent";
import CookiePolicy from "./components/pages/CookiePolicy";
// někdy ještě předělat, zbytečnosti
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [token, setToken] = useState(null);

  const handleFoodManagerLogin = async (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }  

    try {
      const response = await fetch("http://localhost:3002/users");
      const users = await response.json();

      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        setIsLoggedIn(true);
        alert("Logged in successfully!");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  const handleAdminLogin = (token) => {
    setToken(token);
    setAdmin(true);
  };

  const handleLogout = () => {
    setToken(null);
    setAdmin(false);
    setIsLoggedIn(false);
  };

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Retail" element={<Retail />} />
        <Route path="/Gastro" element={<Gastro isAdmin={isAdmin} />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        <Route path="/Gastro/Objednavky" element={<Objednavky />} />
        <Route path="/Gastro/Kontakty" element={<Kontakty />} />
        <Route path="/Gastro/About" element={<About />} />
        <Route path="/Gastro/Sklad" element={<Sklad />} />
        <Route path="/Gastro/Recepty" element={<Recepty />} />
        <Route path="/Gastro/Zajem" element={<Zajem />} />
        <Route path="/Gastro/Historie" element={<Historie />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/update" element={<UpdateProducts />} />
      </Routes>
      
      <CookieConsent />
    </Router>
  );
}

export default App;

/* pokus */


