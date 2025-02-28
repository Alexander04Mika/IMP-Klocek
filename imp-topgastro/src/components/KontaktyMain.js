import React from 'react';
import '../App.css';
import './Podstranky.css';
import mapa from "./assets/mapa.png";

function KontaktyMain() {
  return (
    <div className='hero-container-kontakty'>
      <div className='kontakty-content'>
        <div className='kontakty-text-container'>
          <h5 className='h5' >SÍDLO SPOLEČNOSTI</h5>
          <div className="kontakty-main-container" >
            <p className="kontakty-text"><strong>TOP GASTRO CZ s.r.o.</strong><br />Višňová 1240<br />506 01 Jičín<br />IČ: 02616131<br />DIČ: CZ02616131</p>
            <p className="kontakty-text">
              <a className="kontakty-link" href="https://www.google.cz/maps/place/Vi%C5%A1%C5%88ov%C3%A1+1240,+506+01+Ji%C4%8D%C3%ADn+1-Valdick%C3%A9+P%C5%99edm%C4%9Bst%C3%AD/@50.4369028,15.3782201,17z/data=!4m6!3m5!1s0x470ea391d9006443:0xfd7146803fbefc86!8m2!3d50.4369848!4d15.3782845!16s%2Fg%2F11crwwr8v4?hl=cs&entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                / zobrazit na mapě
              </a>
            </p>

            <h5 className='h5' >SKLAD SPOLEČNOSTI</h5>
            <p className="kontakty-text"><strong>TOP GASTRO CZ s.r.o.</strong><br />Bývalý areál Svit Zlín, Malotova ul. 123, 2. patro, 760 01 Zlín<br />tel.: 702 070 329<br />e-mail: objednavky@topgastrocz.cz</p>
            <p className="kontakty-text">
              <a className="kontakty-link" href="https://www.google.com/maps/search/B%C3%BDval%C3%BD+are%C3%A1l+Svit+Zl%C3%ADn,+Malotova+ul.+123,+2.+patro,+760+01+Zl%C3%ADn" target="_blank" rel="noopener noreferrer">
                / zobrazit na mapě
              </a>
            </p>

            <h5 className='h5' >VEDENÍ SPOLEČNOSTI</h5>
            <p className="kontakty-text">Ladislav Šír<br />tel.: 724 032 557<br />e-mail: ladislav.sir@topgastrocz.cz</p>

            <h5 className='h5' >OBCHODNÍ ŘEDITEL</h5>
            <p className="kontakty-text">Mgr. Tomáš Hamerník<br />tel.: 775 425 791<br />e-mail: hamernik@topgastrocz.cz</p>

            <h5 className='h5' >VEDOUCÍ SKLADU</h5>
            <p className="kontakty-text">Marta Pavlíčková<br />tel.: 702 070 329<br />e-mail: objednavky@topgastrocz.cz</p>
          </div>
        </div>
        <div className='kontakty-image-container'>
          <img src={mapa} alt="Mapa" className="image-hover-kontakty" />
        </div>
      </div>
    </div>
  );
}

export default KontaktyMain;
