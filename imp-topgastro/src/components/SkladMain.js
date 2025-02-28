import React from 'react'
import '../App.css';
import './Podstranky.css';
import sklad from "./assets/sklad.jpeg";

function SkladMain() {
  return (
   
      <div className='hero-container-kontakty'>
      <div className='kontakty-content'>
        <div className='kontakty-text-container'>
          <h5 className='h5'>Změna adresy skladu</h5>
          <div className="kontakty-main-container">
            <h1 className="kontakty-title">Vážení obchodní partneři,</h1>
            <p className="kontakty-text">dovolujeme si vám oznámit, že v rámci rozvoje naší firmy a již nevyhovujících stávajících prostor našeho skladu ve Zlíně, nás s účinností od <strong>28.04.2022</strong> najdete v nových skladovacích prostorách na adrese:</p>

            <p className="kontakty-address">Industrial Area s.r.o., Veselá 228, 763 15 Veselá, budova A — přízemí<br />Česká republika</p>

            <p className="kontakty-text">Chtěli bychom vás tímto požádat o nastavení nové adresy ve vašich systémech a závoz zboží od tohoto termínu, tedy od <strong>28.04.2022</strong>, již na novou adresu.</p>

            <div className="kontakty-contacts">
              <h2 className="kontakty-subtitle">Kontakty:</h2>
              <div className="kontakty-contact-item">Skladová účetní p. Pavlíčková Marta: <a href="tel:+420702070329" className="kontakty-link">+420 702 070 329</a> <a href="mailto:objednavky@topgastrocz.cz" className="kontakty-link">objednavky@topgastrocz.cz</a></div>
              <div className="kontakty-contact-item">Skladník p. Bakalík Jaroslav: <a href="tel:+420778482288" className="kontakty-link">+420 778 482 288</a></div>
              <div className="kontakty-contact-item">Skladník p. Pavlíček Petr: <a href="tel:+420774266761" className="kontakty-link">+420 774 266 761</a></div>
            </div>

            <div className="kontakty-hours">
              <h2 className="kontakty-subtitle">Provozní doba:</h2>
              <p className="kontakty-hours-item">pondělí — čtvrtek od 06:30 do 14:00 h</p>
              <p className="kontakty-hours-item">pátek od 6:30-12.00 h</p>
            </div>

            <p className="kontakty-footer">Děkujeme vám za pochopení a respektování výše uvedené změny.</p>
            <p className="kontakty-footer">S přátelským pozdravem<br />TOP GASTRO CZ s.r.o.</p>
          </div>
        </div>
        <div className='kontakty-image-container'>
          <img src={sklad} alt="Sklad" className="image-hover-kontakty" />
        </div>
      </div>
    </div>
  )
}

export default SkladMain

