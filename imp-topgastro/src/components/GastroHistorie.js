
import React, { useState, useEffect } from 'react';
import '../App.css';
import './GastroHistorie.css';
import historie from "./assets/onas2.webp"; 
import foodbg from "./assets/foodbg.webp"; 

function GastroHistorie() {
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
    img.src = foodbg;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div 
      className='hero-container-historie'
      style={{
        backgroundImage: bgLoaded 
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${foodbg})` 
          : 'none', 
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
      }}
    >
      <div className='historie-content'>
        <div className='historie-text-container'>
          <h5 className='h5'>Příběh TOP GASTRO CZ s.r.o.</h5>
          <div className="historie-main-container">
            <p className="historie-text">Značka TOP GASTRO vznikla v roce 2005, pod vedením současného majitele Ladislava Šíra...</p>
            <p className="historie-text">Na českém trhu se stala stabilním dodavatelem...</p>
            <p className="historie-text">V roce 2014 dochází k oddělení celé této divize...</p>
            <p className="historie-text">V roce 2016 vstupuje TOP GASTRO na retailový trh...</p>
            <p className="historie-text">Společnost sídlí v Jičíně...</p>
            <p className="historie-text">Společnost TOP GASTRO CZ s.r.o. se velmi dynamicky rozrůstá...</p>
            <ul className="historie-list">
              <li>Hrdost, že jsme ryze česko-moravská společnost.</li>
              <li>Nejvyšší kvalita vyráběného a dodávaného zboží.</li>
              <li>Perfektní zákaznický servis.</li>
              <li>Nejvyšší úroveň vztahů s našimi zákazníky.</li>
            </ul>
            <p className="historie-footer">V dnešní “Covidové” době jsou toto základní premisy našeho úspěchu...</p>
          </div>
        </div>
        <div className='historie-image-container'>
          <img 
            src={historie} 
            alt="Historie" 
            className="image-hover-historie" 
            loading="lazy" 
            onClick={toggleFullscreen} 
          />
        </div>
      </div>
      

      {isFullscreen && (
        <div className='fullscreen-overlay' onClick={toggleFullscreen}>
          <div className='fullscreen-content'>
            <img src={historie} alt="Fullscreen View" className="fullscreen-image" />
            <button className="close-button" onClick={closeFullscreen}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GastroHistorie;
