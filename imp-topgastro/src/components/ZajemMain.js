
import React, { useState, useEffect } from 'react';
import './ZajemMain.css';
import zajem from "./assets/zajem.webp";
import foodbg from "./assets/foodbg.webp"; 

function ZajemMain() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const img = new Image();
    img.src = foodbg;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div 
      className="hero-container-zajem"
      style={{
        backgroundImage: bgLoaded 
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${foodbg})` 
          : 'none', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
      }}
    >
      <div className="zajem-content">
        <div className="zajem-text-container">
          <h5 className="h5">Hledáme schopné obchodní zástupce pro celou Českou republiku</h5>
          <div className="zajem-main-container">
            <h1 className="zajem-title"></h1>
            <p className="zajem-text">
              Jsme rychle se rozvíjející společnost, a proto hledáme schopné obchodní zástupce pro celou Českou republiku.
            </p>
            <p className="zajem-text">
              Pokud máte zájem pracovat právě u nás, a máte nám co nabídnout, pošlete nám svůj životopis na níže uvedený kontakt
              a my se mu budeme pečlivě věnovat. V případě, že nás zaujmete, velmi rádi vám odpovíme.
            </p>
            <p className="zajem-text"><strong>Mgr. Tomáš Hamerník</strong></p>
            <p className="zajem-text">Obchodní ředitel</p>
            <p className="zajem-text">E-mail: <a href='mailto:hamernik@topgastrocz.cz'>hamernik@topgastrocz.cz</a></p>
          </div>
        </div>
      </div>

      <div className="zajem-image-container">
        <img 
          src={zajem} 
          alt="Obchodní zástupce" 
          className="image-hover-zajem" 
          loading="lazy" 
          onClick={toggleFullscreen}
        />
      </div>

      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={toggleFullscreen}>
          <div className="fullscreen-content">
            <img src={zajem} alt="Fullscreen View" className="fullscreen-image" />
            <button className="close-button" onClick={toggleFullscreen}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZajemMain;
