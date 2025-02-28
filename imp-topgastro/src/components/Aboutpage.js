import React from 'react';
import onas from "./assets/Onas.jpg";
import './Podstranky.css';

function Aboutpage() {
    return (
        <div className='hero-container-kontakty'>
          <div className='kontakty-content'>
            <div className='kontakty-text-container'>
              <h5 className='h5'>Naše činnost</h5>
              <div className="kontakty-main-container">
                <h1 className="kontakty-title">Dodáváme sortiment potravin, surovin a speciálních výrobků</h1>
                <p className="kontakty-text">pro školní jídelny, hotely, restaurace, domovy důchodců, nemocnice, ústavy sociální péče, závodní kuchyně a jiné.</p>
                <p className="kontakty-text">Patříme mezi významné dodavatele kvalitních výrobků a poskytujeme špičkový dodavatelský servis s pokrytím celé ČR.</p>
                
                <h2 className="kontakty-subtitle">Co nabízíme</h2>
                <p className="kontakty-text">Ctíme kuchařský um a fantazii, proto vám rádi necháváme prostor.</p>
                <p className="kontakty-text">Víme však, jak je kategorie veřejného stravování náročná, nejen ze strany strávníků na výběr, kvalitu a pestrost jídel, ale i ze strany provozovatelů směrem k ekonomice a efektivnosti provozu. A také chápeme, v jakém časovém presu se s přípravou tolika jídel nacházíte. Chceme vám našimi produkty práci ulehčit.</p>
                
                <h2 className="kontakty-subtitle">Kam směřujeme</h2>
                <p className="kontakty-text">Chceme být dobrým zázemím pro váš kuchyňský provoz ze strany surovin a ingrediencí. Věříme, že vás přesvědčí rozsah nabídky, kvalita našich produktů a špičkový obchodní servis.</p>
                
                <p className="kontakty-footer">Ladislav Šír</p>
                <p className="kontakty-footer">jednatel společnosti</p>
              </div>
            </div>
           {/* <div className='kontakty-image-container'>
             <img src={onas} alt="Onas" className="image-hover-kontakty" /> 
            </div> */}
          </div>
        </div>
      );
    }

export default Aboutpage;
