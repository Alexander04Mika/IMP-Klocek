import React, { useState } from "react";
import './App.css';
import Home from './components/pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './components/assets/logo.svg';
import Katalog from './components/pages/katalog.js';
import Kontakty from './components/pages/Kontakty.js';
import Objednavky from './components/pages/Objednavky.js';
import Gastro from './components/pages/Gastro.js';
import Retail from './components/pages/Retail.js';
import AdminDashboard from "./components/AdminDashboard.js";
import AdminLogin from "./components/AdminLogin.js";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDJoQzCDz6Ite_ZZ_ZMTgYRhfpCzfi-mA",
  authDomain: "imp-topgastro.firebaseapp.com",
  projectId: "imp-topgastro",
  storageBucket: "imp-topgastro.firebasestorage.app",
  messagingSenderId: "1050890257870",
  appId: "1:1050890257870:web:834e74a05df666ac99979f",
  measurementId: "G-ZYWDLGTR03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
  <div>
    <img src={logo} alt="My Logo" style={{ width: '100px', height: 'auto' }} />
  </div>

///Firebase API pro přepsání produktu 


const [isAuthenticated, setIsAuthenticated] = useState(false);

// Function to handle login success
const login = () => {
  setIsAuthenticated(true);
};

// Function to handle logout
const logout = () => {
  setIsAuthenticated(false);
};


  return (
    <>

    <Router>
        <Routes>
          <Route path='/' exact element= {<Home />} /> 
          <Route path='/Retail' exact element= {<Retail/>} />
          <Route path='/admin' exact element= {<AdminLogin/>} />
          <Route path='/admin/dashboard' element={isAuthenticated ? <AdminDashboard logout={logout} /> : <AdminLogin login={login} />}/>
          <Route path='/Gastro' exact element= {<Gastro/>} />
          <Route path='/Gastro/Objednavky' exact element= {<Objednavky/>} />
          <Route path='/Gastro/katalog' exact element= {<Katalog />} /> 
          <Route path='/Kontakty' exact element= {<Kontakty />} /> 
          {/*<Route path='/cesta' exact element= {<react soubor />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;