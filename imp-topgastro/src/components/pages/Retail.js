import React from 'react';
import '../../App.css';
import NavbarRetail from '../NavbarRetail';
import RetailMain from '../RetailMain';
import ProRadostBar from '../ProRadostBar';

function Retail() {
  return (
    <div>
      <NavbarRetail/> 
      <RetailMain/>
      <ProRadostBar/>
    </div>
  )
}

export default Retail
