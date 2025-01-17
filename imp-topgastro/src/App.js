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
{/*}
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDJoQzCDz6Ite_ZZ_ZMTgYRhfpCzfi-mA",
  authDomain: "imp-topgastro.firebaseapp.com",
  projectId: "imp-topgastro",
  storageBucket: "imp-topgastro.firebasestorage.app",
  messagingSenderId: "1050890257870",
  appId: "1:1050890257870:web:834e74a05df666ac99979f",
  measurementId: "G-ZYWDLGTR03"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/}
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Retail' exact element={<Retail />} />
          <Route path='/admin' exact element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={isAuthenticated ? <AdminDashboard logout={logout} /> : <AdminLogin login={login} />} />
          <Route path='/Gastro' exact element={<Gastro />} />
          <Route path='/Gastro/Objednavky' exact element={<Objednavky />} />
          <Route path='/Gastro/Kontakty' exact element={<Kontakty />} />
          <Route path='/Gastro/Katalog' exact element={<Katalog/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
