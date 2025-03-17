
import React from 'react';
import './TopGastroMain.css';
import foodBg from './assets/foodbg.webp';

function TopGastroMain() {
  return (
    <div className="gastro-main-container">
      
      <img src={foodBg} alt="Background" className="gastro-main-image" />
      <div className="gastro-main-content">
        <h1>TopGastro</h1>
        <p>dodavatel konvenience do kuchyní,</p>
        <p>jídelen a restaurací</p>
      </div>
    </div>
  );
}

export default TopGastroMain;

