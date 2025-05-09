import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users', formData);
      alert('Usuario registrado exitosamente');
      console.log('Response:', response.data);
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert(error.response?.data?.message || 'Error al registrar el usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </label>
        <label>
          Confirmar Contraseña:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
        </label>
        <label>
          Nombre:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </label>
        <label>
          Apellidos:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </label>
        <label>
          Fecha de Nacimiento:
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} required />
        </label>
        <label>
          Dirección:
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;