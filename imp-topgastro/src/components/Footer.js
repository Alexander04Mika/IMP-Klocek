import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
          <Link to='/Kontakty'><h2>O nás</h2></Link>
            <Link to='/sign-up'>Kdo jsme</Link>
            <Link to='/'>Kariéry</Link>
            <Link to='/'>Katalogy</Link>
            
            
          </div>
          <div class='footer-link-items'>
            <Link to='/Kontakty'><h2>Kontakty</h2></Link>
            <Link to='/Kontakty'>Sklad</Link>
            <Link to='/Kontakty'>Obchodní zástupce</Link>
            <Link to='/Kontakty'>Lokace</Link>
            <Link to='/Kontakty'>Adresy</Link>
            
          </div>
        </div>
       {/*  <div className='footer-link-wrapper'>
         
        <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link> 
          </div>
        </div>*/}
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              
              <img src={logo} alt="Logo" className="footer-logo" />
            </Link>
          </div>
          <small class='website-rights'>TopGastro © 2025</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;