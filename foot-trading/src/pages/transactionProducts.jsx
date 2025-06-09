import React, { useContext, useState } from 'react';
import { CartContext } from '../services/cartContext.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/transactionProducts.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const { cartItems, setCartItems } = useContext(CartContext); // Asegúrate de que setCartItems esté disponible
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://footballtrading.onrender.com/api/create-payment-intent', { cartItems });
            const clientSecret = response.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                alert(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                await axios.post('https://footballtrading.onrender.com/api/payment-success', { cartItems });
                alert('Pago realizado exitosamente');
                setCartItems([]); // Vaciar el carrito
                navigate('/payment-success'); // Redirigir a la página de confirmación
            }
        } catch (error) {
            console.error('Error en el pago:', error);
            alert('Error en el pago');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="card-details">
                <label htmlFor="card-element">Datos Bancarios:</label>
                <CardElement id="card-element" />
            </div>
            <button type="submit" disabled={loading || !stripe || !elements}>
                {loading ? 'Procesando...' : 'Pagar'}
            </button>
        </form>
    );
};

const TransactionProducts = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="transaction-products">
            <h2>Resumen de Productos</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index} className="transaction-item">
                        <img src={item.imagenesAdjuntas[0]} alt={item.titulo} className="transaction-item-img" />
                        <div className="transaction-item-details">
                            <h3>{item.titulo}</h3>
                            <p>Precio: €{item.precio}</p>
                            <p>Cantidad: {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="transaction-total">
                <h3>Total: €{cartItems.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2)}</h3>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default TransactionProducts;