import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  const { paddingTop, src, label, path, text } = props;

  const isExternal = path.startsWith('http') || path.endsWith('.pdf');

  return (
    <li className='cards__item'>
      {isExternal ? (
        
        <a className='cards__item__link' href={path} target='_blank' rel='noopener noreferrer'>
          <FigureComponent src={src} paddingTop={paddingTop} altText={text} />
          <TextComponent text={text} />
        </a>
      ) : (
        
        <Link className='cards__item__link' to={path}>
          <FigureComponent src={src} paddingTop={paddingTop} altText={text}/>
          <TextComponent text={text} />
        </Link>
      )}
    </li>
  );
}

const FigureComponent = ({ src, label, paddingTop, altText }) => (
  <figure className='cards__item__pic-wrap' data-category={label} style={{ paddingTop }}>
    <img className='cards__item__img' alt={altText} src={src} loading="lazy" />
  </figure>
);

const TextComponent = ({ text }) => (
  <div className='cards__item__info'>
    <h5 className='cards__item__text'>{text}</h5>
 
  </div>
);

export default CardItem;
