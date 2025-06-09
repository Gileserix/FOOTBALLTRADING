import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/paymentSuccess.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="payment-success-container">
            <h1>¡Pago realizado con éxito!</h1>
            <p>Gracias por tu compra</p>
            <button className="home-button" onClick={() => navigate('/')}>
                Volver a la página de inicio
            </button>
        </div>
    );
};

export default PaymentSuccess;