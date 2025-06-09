import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';
import '../styles/resetPassword.css';

const ResetPassword = () => {
    const { token } = useParams(); // Recoge el token de la URL
    const navigate = useNavigate(); // Hook para redirigir al usuario
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        // Validar que la contraseña cumpla con los requisitos
        if (!validatePassword(newPassword)) {
            setMessage('La contraseña debe tener entre 8 y 12 caracteres, incluir al menos una mayúscula, una minúscula y un número');
            return;
        }

        try {
            const response = await axios.post('/reset-password', { token, newPassword });
            setMessage(response.data.message);

            // Redirigir a la página de inicio después de actualizar la contraseña
            setTimeout(() => {
                navigate('/');
            }, 4000); // Espera 4 segundos para mostrar el mensaje antes de redirigir
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            setMessage(error.response?.data?.message || 'Error al actualizar la contraseña');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newPassword">Nueva Contraseña:</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Actualizar Contraseña</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ResetPassword;