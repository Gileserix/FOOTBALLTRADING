import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../services/userContext.js';
import '../styles/login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            alert('Inicio de sesión exitoso');
            setUser(response.data.user.username);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const handleLogout = () => {
        setUser(null);
        alert('Has cerrado sesión');
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="login-container">
            {user ? (
                <div>
                    <p>Has iniciado sesión como {user}</p>
                    <button className='login-button' onClick={handleProfile}>Mi Perfil</button>
                    <button className='login-button' onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="login-row">
                        <label htmlFor="username">Usuario:</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                    </div>
                    <div className="login-row">
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                    </div>
                    <button className='login-button' type="submit">Iniciar Sesión</button>
                    <div className="login-links">
                        <a href="/forgot-password" className="left-link">¿Has olvidado tu contraseña?</a>
                        <a href="/register" className="right-link">Regístrate</a>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;