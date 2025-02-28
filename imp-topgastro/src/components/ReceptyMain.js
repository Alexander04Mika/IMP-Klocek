import React from 'react';
import './Podstranky.css';
import '../App.css';
import kuba from "./assets/kuba.jpg";

function ReceptyMain() {
    return (
        <div className='hero-container-kontakty'>
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
          <img src={kuba} alt="Vanocni Kuba" className="image-hover-kontakty" />
        </div>
          </div>
        </div>
      );
}

export default ReceptyMain;
