import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './assets/logo.svg'; 
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar() {
  const [click, setClick] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); // State to check if the screen is mobile
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = () => setClick(!click);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  // Hook to check screen size for mobile
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 980) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add event listener to check screen resize
    window.addEventListener('resize', updateWidth);

    // Initial check on mount
    updateWidth();

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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
            <Link to="/Gastro/Kontakty" className="nav-links">Kontakty</Link>
          </li>
          <li className="nav-item">
            <Link to="/Gastro/Onas" className="nav-links">O nás</Link>
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
