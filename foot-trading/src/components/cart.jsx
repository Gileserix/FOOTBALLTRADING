import React, { useContext } from 'react';
import { CartContext } from '../services/cartContext';
import '../styles/cart.css'; // Asegúrate de tener un archivo CSS para estilos del carrito

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <p>No hay artículos en el carrito.</p>;
  }

  return (
    <div className="cart">
      <h2>Resumen del Carrito</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img
              src={item.imagenesAdjuntas[0]} // Usar la primera imagen del array
              alt={item.titulo}
              className="cart-item-img"
            />
            <div className="cart-item-details">
              <h3>{item.titulo}</h3>
              <p>Talla seleccionada: {item.selectedSize}</p>
              <p>Precio: €{item.precio}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromCart(index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>
          Total: €
          {cartItems.reduce((total, item) => total + item.precio, 0).toFixed(2)}
        </h3>
      </div>
      <button className="checkout-button">Tramitar Compra</button>
    </div>
  );
};

export default Cart;