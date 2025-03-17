import React, { useState, useEffect } from 'react';
import onas from "./assets/Onas.webp"; // ted nepoužívám
import foodBg from "./assets/foodbg.webp"; 
import './Podstranky.css';

function Aboutpage() {
    const [bgLoaded, setBgLoaded] = useState(false);

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
              <h5 className='h5'>Naše činnost</h5>
              <div className="kontakty-main-container">
                <h1 className="kontakty-title">Dodáváme sortiment potravin, surovin a speciálních výrobků</h1>
                <p className="kontakty-text">pro školní jídelny, hotely, restaurace, domovy důchodců, nemocnice, ústavy sociální péče, závodní kuchyně a jiné.</p>
                <p className="kontakty-text">Patříme mezi významné dodavatele kvalitních výrobků a poskytujeme špičkový dodavatelský servis s pokrytím celé ČR.</p>
                
                <h2 className="kontakty-subtitle">Co nabízíme</h2>
                <p className="kontakty-text">Ctíme kuchařský um a fantazii, proto vám rádi necháváme prostor.</p>
                <p className="kontakty-text">Víme však, jak je kategorie veřejného stravování náročná...</p>
                
                <h2 className="kontakty-subtitle">Kam směřujeme</h2>
                <p className="kontakty-text">Chceme být dobrým zázemím pro váš kuchyňský provoz...</p>
                
                <p className="kontakty-footer">Ladislav Šír</p>
                <p className="kontakty-footer">jednatel společnosti</p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Aboutpage;
