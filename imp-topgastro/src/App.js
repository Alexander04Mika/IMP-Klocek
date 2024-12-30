import React from "react";
import './App.css';
import Home from './components/pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './components/assets/logo.svg';
import Katalog from './components/pages/katalog.js';
import Kontakty from './components/pages/Kontakty.js';
import Objednavky from './components/pages/Objednavky.js';
import Gastro from './components/pages/Gastro.js';
import Retail from './components/pages/Retail.js';

function App() {
  <div>
    <img src={logo} alt="My Logo" style={{ width: '100px', height: 'auto' }} />
  </div>
  return (
    <>

    <Router>
        <Routes>
          <Route path='/' exact element= {<Home />} /> 
          <Route path='/Retail' exact element= {<Retail/>} />
          <Route path='/Gastro' exact element= {<Gastro/>} />
          <Route path='/Gastro/Objednavky' exact element= {<Objednavky/>} />
          <Route path='/Gastro/katalog' exact element= {<Katalog />} /> 
          <Route path='/Kontakty' exact element= {<Kontakty />} /> 
          {/*<Route path='/order' exact element= {<Objednávkový formulář />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;