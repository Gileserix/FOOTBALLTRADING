import React, { useState } from 'react';
import axios from 'axios';
import '../styles/forgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://footballtrading.onrender.com/api/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            setMessage(error.response?.data?.message || 'Error al enviar el correo');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Olvidar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar Correo</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ForgotPassword;