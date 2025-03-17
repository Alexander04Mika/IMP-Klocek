import React from 'react';
import './RetailMain.css';
import videob from './assets/proradost.mp4';

function RetailMain() {
  return (
    
    <div className='retail-hero-container'>
    <video autoPlay loop muted playsInline className="retail-hero-video">
      <source src={videob} type="video/mp4" />
      funguje?
    </video>
    
    <h1>Retail</h1>
    <p>spolehlivý dodavatel</p> 
    <p>do maloobchodní sítě</p>
  </div>
  )
}

export default RetailMain
