import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../services/cartContext';
import '../styles/cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (cartItems.length === 0) {

        return  <div className="cart-empty">
                    <p>Tu carrito está vacío.</p>
         </div>
    }

    return (
        <div className="cart">
            <h2>Resumen del Carrito</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <img src={item.imagenesAdjuntas[0]} alt={item.titulo} className="cart-item-img" />
                        <div className="cart-item-details">
                            <h3>{item.titulo}</h3>
                            <p>Precio: €{item.precio}</p>
                            <p>Cantidad: {item.quantity}</p>
                        </div>
                        <button className="remove-button" onClick={() => removeFromCart(item._id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <h3>Total: €{cartItems.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2)}</h3>
            </div>
            <button className="checkout-button" onClick={() => navigate('/transaction-products')}>
                Tramitar Pedido
            </button>
        </div>
    );
};

export default Cart;