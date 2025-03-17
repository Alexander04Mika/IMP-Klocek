

import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from './assets/logo.webp';
import facebookLogo from './assets/facebook-logo.png';
import instagramLogo from './assets/instagram-logo.png';

function Footer({ isAdmin }) {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Link to='/Gastro/About'><h2 className="white-text">O nás</h2></Link>
            <Link to='/Gastro/About'  className="white-text"><p>Kdo jsme</p></Link> {/* maybe nová podstránka */}
            
            <a href='/katalog2024.pdf' target='_blank' rel='noopener noreferrer'><p>Katalog 2024</p></a>
            <a href='/katalog2023.pdf' target='_blank' rel='noopener noreferrer'><p>Katalog 2023</p></a>
            <Link to='/Gastro/Historie'  className="white-text"><p>Historie</p></Link>
          </div>
          <div className='footer-link-items'>
            <Link to='/Gastro/Kontakty'><h2 className="white-text">Kontakty</h2></Link>
            <Link to='/Gastro/Sklad'><p>Sklad</p></Link>
            <Link to='/Gastro/Zajem'><p>Obchodní zástupce</p></Link>
            <Link to='/Gastro/Kontakty'><p>Lokace</p></Link>
          </div>
        </div>
      </div>

      <section className='social-media'>
        <div className='social-media-wrap'>
          <Link to='/' className='social-logo'>
            <img src={logo} alt="Logo" className="footer-logo" />
          </Link>
          <div className="social-icons">
          {/*}  <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </Link>
            <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'>
              <i className='fab fa-instagram' />
            </Link>  */}

          <Link className='social-icons-link facebook' to='/' target='_blank' aria-label='Facebook'>
              <img src={facebookLogo} alt='Facebook' className='social-icons' />
          </Link>
          <Link className='social-icons-link instagram' to='/' target='_blank' aria-label='Instagram'>
              <img src={instagramLogo} alt='Instagram' className='social-icons' />
          </Link>

          </div>
          <small className='website-rights'>TopGastro © 2025</small>
          {isAdmin ? (
            <Link to="/admin/dashboard">
              <button className="admin-dashboard-button">Admin Dashboard</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="admin-login-button">Admin Login</button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Footer;
