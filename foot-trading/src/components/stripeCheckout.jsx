import React, { useContext, useState } from 'react';
import { CartContext } from '../services/cartContext.js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Crear PaymentIntent en el backend
            const response = await axios.post('https://footballtrading.onrender.com/api/create-payment-intent', { cartItems });
            const clientSecret = response.data.clientSecret;

            // Confirmar el pago con Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                alert(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                // Eliminar productos comprados en el backend
                await axios.post('https://footballtrading.onrender.com/api/payment-success', { cartItems });
                alert('Pago realizado exitosamente');
                setCartItems([]); // Vaciar el carrito
            }
        } catch (error) {
            console.error('Error en el pago:', error);
            alert('Error en el pago');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={loading || !stripe || !elements}>
                {loading ? 'Procesando...' : 'Pagar'}
            </button>
        </form>
    );
};

const StripeCheckout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeCheckout;