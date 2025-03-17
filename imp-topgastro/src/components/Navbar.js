import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './assets/logo.svg'; 
import menuIcon from './assets/menu-icon.png';  
import closeIcon from './assets/close-icon.png'; 
import { Link, useNavigate } from 'react-router-dom'; 

function Navbar() {
  const [click, setClick] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); 
  const navigate = useNavigate(); 

  const handleClick = () => setClick(!click);

  const handleBackClick = () => {
    navigate(-1); 
  };

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
      <img src={logo} alt="Logo" className={`hero-logo ${click ? 'logo-hidden' : ''}`} />
      
      <div className="navbar-container">
        <div className="menu-icon" onClick={handleClick}>
          <img src={click ? closeIcon : menuIcon} alt="Menu" className="menu-img" />
        </div>
        <ul className={`nav-menu ${click ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/Gastro" className="nav-links">Doma</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/Kontakty" className="nav-links">Kontakty</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/About" className="nav-links">O nás</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/Sklad" className="nav-links">Sklad</Link>
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
