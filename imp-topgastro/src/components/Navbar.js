import React, { useState } from 'react';
import './Navbar.css';
import logo from './assets/logo.svg'; 
import { Link } from 'react-router-dom'; 

function Navbar() {
  const [click, setClick] = useState(false); 

  const handleClick = () => setClick(!click);

  return (
    <nav className={`navbar ${click ? 'active' : ''}`}>
      <img src={logo} alt="Logo" className="hero-logo" />
      <div className="navbar-container">
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${click ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/Gastro" className="nav-links">Doma</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/Katalog"  className="nav-links">Katalog</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/kariera" className="nav-links">Kariera</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/Objednavky" className="nav-links">Objednávkový formulář</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
