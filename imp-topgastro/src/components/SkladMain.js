import React, { useState, useEffect } from 'react';
import '../App.css';
import './Podstranky.css';
import sklad from "./assets/sklad.webp";
import foodBg from "./assets/foodbg.webp"; 

function SkladMain() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = foodBg;
    img.onload = () => setBgLoaded(true);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(prevState => !prevState);
  };

  const closeFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(false);
  };

  return (
    <div 
      className='hero-container-kontakty'
      style={{
        backgroundImage: bgLoaded 
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${foodBg})`
          : 'none'
      }}
    >
      <div className='kontakty-content'>
        <div className='kontakty-text-container'>
          <h5 className='h5'>Změna adresy skladu</h5>
          <div className="kontakty-main-container">
            <h1 className="kontakty-title">Vážení obchodní partneři,</h1>
            <p className="kontakty-text">dovolujeme si vám oznámit, že...</p>
            <p className="kontakty-address">Industrial Area s.r.o., Veselá 228...</p>
            <p className="kontakty-text">Chtěli bychom vás tímto požádat o nastavení nové adresy...</p>

            <div className="kontakty-contacts">
              <h2 className="kontakty-subtitle">Kontakty:</h2>
              <div className="kontakty-contact-item">Skladová účetní p. Pavlíčková Marta: <a href="tel:+420702070329" className="kontakty-link">+420 702 070 329</a></div>
            </div>

            <div className="kontakty-hours">
              <h2 className="kontakty-subtitle">Provozní doba:</h2>
              <p className="kontakty-hours-item">pondělí — čtvrtek od 06:30 do 14:00 h</p>
            </div>

            <p className="kontakty-footer">Děkujeme vám za pochopení...</p>
          </div>
        </div>

      
        <div className='kontakty-image-container'>
          <img 
            src={sklad} 
            alt="Sklad" 
            className="image-hover-kontakty" 
            loading="lazy" 
            onClick={toggleFullscreen} 
          />
        </div>
      </div>

   
      {isFullscreen && (
        <div className='fullscreen-overlay' onClick={toggleFullscreen}>
          <div className='fullscreen-content'>
            <img src={sklad} alt="Fullscreen View" className="fullscreen-image" />
            <button className="close-button" onClick={closeFullscreen}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkladMain;
