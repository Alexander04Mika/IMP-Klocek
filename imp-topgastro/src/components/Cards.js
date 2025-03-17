

import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='pictures/2024kat.webp'
              text='Katalog 2024'
              
              path='/katalog2024.pdf'
              paddingTop='130%'
            />
            <CardItem
              src='pictures/2023kat.webp'
              text='Katalog 2023'
              /*label='Katalog 2023'         ----- label už nikde nepoužívám */
              path='/katalog2023.pdf'
              paddingTop='130%'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='pictures/sklad.webp'
              text='Změna adresy skladu'
             
              path='/Gastro/Kontakty'
              paddingTop='67%'
            />
            <CardItem
              src='pictures/recept.webp'
              text='Tip na Recept'
             
              path='/Gastro/Recepty'
              paddingTop='67%'
            />
            <CardItem
              src='pictures/zastupce.webp'
              text='Hledáme schopné obchodní zástupce pro celou ČR'
             
              path='/Gastro/Zajem'
              paddingTop='67%'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards; 
