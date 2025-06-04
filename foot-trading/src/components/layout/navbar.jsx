import React, { useState } from 'react';
import '../../styles/navbar.css';
import Cart from '../cart.jsx';
import Login from '../login.jsx';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  return (
    <header>
      <div className="top-nav">
        <div className="logo">
          <img src="../../assets/images/LogoPeque.png" alt="Logo Pequeño" className="small-logo" />
          <h1>Football Trading</h1>
        </div>
        <div className="icons">
          <button className="icon icon1" onClick={() => setShowLogin(!showLogin)}><img src="../../assets/iconos/Login.png" alt="Icon1" /></button>
          <div className={`login-dropdown ${showLogin ? 'show' : ''}`}>
            <Login />
          </div>
          <button className="icon icon2" onClick={handleCartClick}><img src="../../assets/iconos/CestaCompra.png" alt="Icon2" /></button>
          <button className="icon icon3"><img src="../../assets/iconos/Ajustes.png" alt="Icon3" /></button>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="bottom-nav">
        <ul>
          <li><a href="/cloths">Ropa</a></li>
          <li><a href="/cards">Cartas</a></li>
          <li><a href="/create-your-product">Sube tu Producto</a></li>
          <li><a href="/accessories">Accesorios</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
      <div className={`cart-dropdown ${showCart ? 'show' : ''}`}>
        <Cart />
      </div>
    </header>
  );
};

export default Navbar;