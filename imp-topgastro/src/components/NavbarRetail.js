/*
import React, { useState, useEffect } from 'react';
import './NavbarRetail.css';
import logo3 from './assets/logoretail.webp'; 
import logo2 from './assets/bslogoretail.webp';
import { Link, useNavigate } from 'react-router-dom'; 

function Navbar() {
  const [click, setClick] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); // State to check if the screen is mobile
  
  const handleClick = () => setClick(!click);

  // Hook to check screen size for mobile
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 980) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <nav className={`navbar ${click ? 'active' : ''}`}>
      
      <img src={logo3} alt="Logo3" className="hero-logo3" />
      
      <div className="navbar-container">
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`nav-menu ${click ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/Retail" className="nav-links">Doma</Link>
          </li>
          <li className="nav-item">
            <Link to="/Retail/Katalog" className="nav-links">Katalog</Link>
          </li>
          <li className="nav-item">
            <Link to="/Retail/kariera" className="nav-links">Kariera</Link>
          </li>
          <li className="nav-item">
            <Link to="/Retail/Objednavky" className="nav-links">Objednávkový formulář</Link>
          </li>
        </ul>
      </div>

      <img src={logo2} alt="Logo2" className="hero-logo2" />
    </nav>
  );
}

export default Navbar; */

import React, { useState, useEffect } from 'react';
import './NavbarRetail.css';
import logo3 from './assets/logoretail.webp'; 
import logo2 from './assets/bslogoretail.webp';
import { Link, useNavigate } from 'react-router-dom'; 

function NavbarRetail() {
  const [click, setClick] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); // State to check if the screen is mobile
  
  const handleClick = () => setClick(!click);

  // Hook to check screen size for mobile
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 980) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <nav className={`retail-navbar ${click ? 'active' : ''}`}>
      <img src={logo3} alt="Retail Logo 3" className="retail-logo3" />
      
      <div className="retail-navbar-container">
        <div className="retail-menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={`retail-nav-menu ${click ? 'active' : ''}`}>
          <li className="retail-nav-item">
            <Link to="/Retail" className="retail-nav-links">Doma</Link>
          </li>
          <li className="retail-nav-item">
            <Link to="/Retail/Katalog" className="retail-nav-links">Katalog</Link>
          </li>
          <li className="retail-nav-item">
            <Link to="/Retail/kariera" className="retail-nav-links">Kariera</Link>
          </li>
          <li className="retail-nav-item">
            <Link to="/Retail/Objednavky" className="retail-nav-links">Objednávkový formulář</Link>
          </li>
        </ul>
      </div>

      <img src={logo2} alt="Retail Logo 2" className="retail-logo2" />
    </nav>
  );
}

export default NavbarRetail;

