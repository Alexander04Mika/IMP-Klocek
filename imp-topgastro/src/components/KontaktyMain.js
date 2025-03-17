import React, { useEffect, useState } from 'react';
import '../App.css';
import './Podstranky.css';
import foodBg from "./assets/foodbg.webp"; // Background image

function KontaktyMain() {
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
          <h5 className='h5'>SÍDLO SPOLEČNOSTI</h5>
          <div className="kontakty-main-container">
            <p className="kontakty-text"><strong>TOP GASTRO CZ s.r.o.</strong><br />Višňová 1240<br />506 01 Jičín<br />IČ: 02616131<br />DIČ: CZ02616131</p>
            <p className="kontakty-text">
              <a className="kontakty-link" href="https://www.google.cz/maps/place/Vi%C5%A1%C5%88ov%C3%A1+1240,+506+01+Ji%C4%8D%C3%ADn" target="_blank" rel="noopener noreferrer">
                / zobrazit na mapě
              </a>
            </p>

            <h5 className='h5'>SKLAD SPOLEČNOSTI</h5>
            <p className="kontakty-text"><strong>TOP GASTRO CZ s.r.o.</strong><br />Bývalý areál Svit Zlín, Malotova ul. 123, 2. patro, 760 01 Zlín<br />tel.: 702 070 329<br />e-mail: objednavky@topgastrocz.cz</p>
            <p className="kontakty-text">
              <a className="kontakty-link" href="https://www.google.com/maps/search/B%C3%BDval%C3%BD+are%C3%A1l+Svit+Zl%C3%ADn" target="_blank" rel="noopener noreferrer">
                / zobrazit na mapě
              </a>
            </p>

            <h5 className='h5'>VEDENÍ SPOLEČNOSTI</h5>
            <p className="kontakty-text">Ladislav Šír<br />tel.: 724 032 557<br />e-mail: ladislav.sir@topgastrocz.cz</p>

            <h5 className='h5'>OBCHODNÍ ŘEDITEL</h5>
            <p className="kontakty-text">Mgr. Tomáš Hamerník<br />tel.: 775 425 791<br />e-mail: hamernik@topgastrocz.cz</p>

            <h5 className='h5'>VEDOUCÍ SKLADU</h5>
            <p className="kontakty-text">Marta Pavlíčková<br />tel.: 702 070 329<br />e-mail: objednavky@topgastrocz.cz</p>
          </div>
        </div>

        <div className='kontakty-image-container'>
          <iframe 
            className="map-frame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.4559347080215!2d15.37822017641632!3d50.43690277157279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470ea391d9006443%3A0xfd7146803fbefc86!2zVmnhu5Fub3bDoSAxMjQwLCA1MDYgMDEgSmnFvWluIDE!5e0!3m2!1scs!2scz!4v1710000000000" 
            width="100%" 
            height="400" 
            allowFullScreen 
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default KontaktyMain;
