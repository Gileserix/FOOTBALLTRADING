import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const EmailConfirmation = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Verificando tu correo electrónico...');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setMessage('Token de verificación no proporcionado.');
                return;
            }

            try {
                const response = await axios.get(`https://footballtrading.onrender.com/api/users/verify-email?token=${token}`);
                setMessage(response.data.message || 'Correo verificado exitosamente.');
            } catch (error) {
                console.error('Error al verificar el correo:', error);
                setMessage(error.response?.data?.message || 'Error al verificar el correo.');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>{message}</h1>
        </div>
    );
};

export default EmailConfirmation;