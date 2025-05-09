
import React, { useContext } from 'react';
import { CartContext } from '../services/cartContext.js';
import '../styles/cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace('€', '')), 0);

  const handleCheckout = () => {
    alert('Compra tramitada con éxito');
  };

  return (
    <div className="cart">
      <h2>Resumen del Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay artículos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.imgSrc} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Talla: {item.selectedSize}</p>
                  <p>Precio: {item.price}</p>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: €{total.toFixed(2)}</h3>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Tramitar Compra</button>
        </>
      )}
    </div>
  );
};

export default Cart;