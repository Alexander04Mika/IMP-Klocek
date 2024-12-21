import React from 'react';
import '../../App.css';
import Cards from '../Cards.js';
import Footer from '../Footer.js';
import Navbar from '../Navbar.js';
import TopGastroMain from '../TopGastroMain.js';
import Topgastrobar from '../Topgastrobar.js';

function Gastro() {
    return (
        <>
        <Navbar/>
        <TopGastroMain/>
        <Topgastrobar/>
        <Cards/>
        <Footer/>
        </>
    );
}

export default Gastro;
