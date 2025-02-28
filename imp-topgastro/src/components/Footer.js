import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

function Footer({ isAdmin }) {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Link to='/Kontakty'><h2 className="white-text">O nás</h2></Link>
            <Link to='/sign-up'  className="white-text">Kdo jsme</Link>
            <Link to='/'>Kariéry</Link>
            <Link to='/'>Katalogy</Link>
          </div>
          <div className='footer-link-items'>
            <Link to='/Kontakty'><h2 className="white-text">Kontakty</h2></Link>
            <Link to='/Kontakty'>Sklad</Link>
            <Link to='/Kontakty'>Obchodní zástupce</Link>
            <Link to='/Kontakty'>Lokace</Link>
            <Link to='/Kontakty'>Adresy</Link>
          </div>
        </div>
      </div>

      <section className='social-media'>
        <div className='social-media-wrap'>
          <Link to='/' className='social-logo'>
            <img src={logo} alt="Logo" className="footer-logo" />
          </Link>
          <div className="social-icons">
            <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </Link>
            <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'>
              <i className='fab fa-instagram' />
            </Link>
          </div>
          <small className='website-rights'>TopGastro © 2025</small>
          {isAdmin ? (
            <Link to="/admin/dashboard">
              <button className="admin-dashboard-button">Admin Dashboard</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="admin-login-button">Admin Přihlašený</button>
            </Link>
          )}
      
        
        </div>
      </section>
    </div>
  );
}

export default Footer;
