import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  const { paddingTop, src, label, path, text } = props;

  return (
    <li className='cards__item'>
      <Link className='cards__item__link' to={path}>
        <figure
          className='cards__item__pic-wrap'
          data-category={label}
          style={{ paddingTop: paddingTop }} // Apply dynamic padding-top
        >
          <img className='cards__item__img' alt='Imageidk' src={src} /> 
        </figure>
        <div className='cards__item__info'>
          <h5 className='cards__item__text'>{text}</h5>
        </div>
      </Link>
    </li>
  );
}

export default CardItem;
