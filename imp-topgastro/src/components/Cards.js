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
              src='pictures/2024kat.jpg'
              text='Katalog 2024'
              label='Katalog 2024'
              path='/Gastro/katalog'
              paddingTop='130%'
            />
            <CardItem
              src='pictures/2023kat.jpg'
              text='Katalog 2023'
              label='Katalog 2023'
              path='/Gastro/katalog'
              paddingTop='130%'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='pictures/sklad.jpg'
              text='Změna adresy skladu'
              label='Sklad'
              path='/adresa'
              paddingTop='67%'
              
            />
            <CardItem
              src='pictures/recept.jpg'
              text='Tip na Recept'
              label='Recept'
              path='/recepts'
              paddingTop='67%'
            />
            <CardItem
              src='pictures/zastupce.jpg'
              text='Hledáme schopné obchodní zástupce pro celou Českou republiku'
              label='Hledáme zástupce'
              path='/adresa'
              paddingTop='67%'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;