/*import React, { useState, useEffect } from 'react';
import './Podstranky.css';
import '../App.css';
import kuba from "./assets/kuba.webp";  // Recipe image
import foodBg from "./assets/foodbg.webp";  // Background image

function ReceptyMain() {
  // State to handle fullscreen toggle
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  // Function to toggle fullscreen state
  const toggleFullscreen = () => {
    setIsFullscreen(prevState => !prevState);
  };

  // Function to close fullscreen when clicking the "X" button
  const closeFullscreen = (e) => {
    e.stopPropagation();  // Prevent the event from propagating to the overlay
    setIsFullscreen(false);
  };

  // Load background image dynamically
  useEffect(() => {
    const img = new Image();
    img.src = foodBg;
    img.onload = () => setBgLoaded(true);
  }, []);

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
          <h5 className='h5'>Tradiční Vánoční Recept</h5>
          <div className="kontakty-main-container">
            <h1 className="kontakty-title">Pravý houbový kuba na vánoční stůl</h1>
            <p className="kontakty-text">Nejen na vánoční stůl tradičně patří pravý houbový kuba. Přinášíme vám zaručený recept, který se postará o vánoční náladu vašich strávníků.</p>
            
            <h2 className="kontakty-subtitle">Budeme potřebovat:</h2>
            <ul className="kontakty-text">
              <li>5 lžic sušených hub TopGastro</li>
              <li>300 g krup</li>
              <li>3 lžíce sádla</li>
              <li>5 plátků anglické slaniny</li>
              <li>1 cibule</li>
              <li>kmín drcený TopGastro</li>
              <li>pepř černý mletý TopGastro</li>
              <li>majoránka TopGastro</li>
              <li>česnek granulovaný TopGastro</li>
              <li>sůl</li>
            </ul>

            <h2 className="kontakty-subtitle">Postup přípravy:</h2>
            <p className="kontakty-text">Kroupy propláchneme ve větším množství vody a vaříme do měkka. Na sádle orestujeme dozlatova cibuli nakrájenou najemno společně s kousky anglické slaniny. Přidáme česnek a předem namočené sušené houby, osolíme, vmícháme koření a dusíme do měkka. Kroupy podléváme vývarem z hub. Uvařené krupky smícháme se směsí a vložíme do sádlem vymazaného pekáčku. Pečeme na 180°C asi 35 minut.</p>
            
            <h2 className="kontakty-subtitle">Dobrou chuť!</h2>
          </div>
        </div>

        <div className='kontakty-image-container'>
        
          <img 
            src={kuba} 
            alt="Vanocni Kuba" 
            className="image-hover-kontakty" 
            loading="lazy" 
            onClick={toggleFullscreen}
          />
        </div>
      </div>

      {isFullscreen && (
        <div className='fullscreen-overlay' onClick={toggleFullscreen}>
          <div className='fullscreen-content'>
            <img src={kuba} alt="Fullscreen View" className="fullscreen-image" />
            <button className="close-button" onClick={closeFullscreen}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceptyMain;
*/

import React, { useState, useEffect } from 'react';
import './ReceptyMain.css';
import '../App.css';
import kuba from "./assets/kuba.webp";  
import foodBg from "./assets/foodbg.webp";  

function ReceptyMain() {
 
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(prevState => !prevState);
  };

  const closeFullscreen = (e) => {
    e.stopPropagation();  
    setIsFullscreen(false);
  };

  useEffect(() => {
    const img = new Image();
    img.src = foodBg;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div 
      className='hero-container-recept'
      style={{
        backgroundImage: bgLoaded 
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${foodBg})`
          : 'none'
      }}
    >
      <div className='recept-content'>
        <div className='recept-text-container'>
          <h5 className='h5'>Tradiční Vánoční Recept</h5>
          <div className="recept-main-container">
            <h1 className="recept-title">Pravý houbový kuba na vánoční stůl</h1>
            <p className="recept-text">Nejen na vánoční stůl tradičně patří pravý houbový kuba. Přinášíme vám zaručený recept, který se postará o vánoční náladu vašich strávníků.</p>
            
            <h2 className="recept-subtitle">Budeme potřebovat:</h2>
            <ul className="recept-text">
              <li>5 lžic sušených hub TopGastro</li>
              <li>300 g krup</li>
              <li>3 lžíce sádla</li>
              <li>5 plátků anglické slaniny</li>
              <li>1 cibule</li>
              <li>kmín drcený TopGastro</li>
              <li>pepř černý mletý TopGastro</li>
              <li>majoránka TopGastro</li>
              <li>česnek granulovaný TopGastro</li>
              <li>sůl</li>
            </ul>

            <h2 className="recept-subtitle">Postup přípravy:</h2>
            <p className="recept-text">Kroupy propláchneme ve větším množství vody a vaříme do měkka. Na sádle orestujeme dozlatova cibuli nakrájenou najemno společně s kousky anglické slaniny. Přidáme česnek a předem namočené sušené houby, osolíme, vmícháme koření a dusíme do měkka. Kroupy podléváme vývarem z hub. Uvařené krupky smícháme se směsí a vložíme do sádlem vymazaného pekáčku. Pečeme na 180°C asi 35 minut.</p>
            
            <h2 className="recept-subtitle">Dobrou chuť!</h2>
          </div>
        </div>

        <div className='recept-image-container'>
          <img 
            src={kuba} 
            alt="Vanocni Kuba" 
            className="image-hover-recept" 
            loading="lazy" 
            onClick={toggleFullscreen}
          />
        </div>
      </div>

      {isFullscreen && (
        <div className='fullscreen-overlay' onClick={toggleFullscreen}>
          <div className='fullscreen-content'>
            <img src={kuba} alt="Fullscreen View" className="fullscreen-image" />
            <button className="close-button" onClick={closeFullscreen}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceptyMain;
