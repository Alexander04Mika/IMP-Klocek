import React from 'react';
import './HomeCards.css';
import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import leftImage from './assets/img-left.jpg';
import rightImage from './assets/img-right.jpg';
import './TopGastroMain.css';

function HomeCards() {
  return (
    <div className="home-container">
      
      {/* Left Image (funguje jako tlačítko) */}
      <Link to="/Retail" className="image-side left-side">
        <img src={leftImage} alt="Left Side" className="side-image" />
        <div className="image-text">
          <h1>Retail</h1>
          <p>spolehlivý dodavatel</p> 
          <p>do maloobchodní sítě</p>
        </div>
      </Link>

      <div className="logo-container">
        <img src={logo} alt="Logo" className="center-logo" />
      </div>

      <Link to="/Gastro" className="image-side right-side">
        <img src={rightImage} alt="Right Side" className="side-image" />
        <div className="image-text">
          <h1>GASTRO</h1>
          <p>dodavatel konvenience do kuchyní,</p> 
          <p>jídelen a restaurací</p>
        </div>
      </Link> 
    </div>
  );
}

export default HomeCards;
