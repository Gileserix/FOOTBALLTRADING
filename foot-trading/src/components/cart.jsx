import React, { useContext } from 'react';
import { CartContext } from '../services/cartContext.js';
import '../styles/cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + Number(item.precio || item.price || 0), 0);

  return (
    <div className="cart">
      <h2>Resumen del Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay artículos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.id || item._id || (item.titulo || item.title) + '-' + index} className="cart-item">
                <img src={item.imagenesAdjuntas?.[0] || item.imgSrc} alt={item.titulo || item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.titulo || item.title}</h3>
                  {item.talla && <p>Talla: {item.talla}</p>}
                  <p>Precio: {item.precio || item.price} €</p>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: €{total.toFixed(2)}</h3>
          </div>
          <button className="checkout-button" onClick={() => alert('Compra tramitada con éxito')}>Tramitar Compra</button>
        </>
      )}
    </div>
  );
};

export default Cart;